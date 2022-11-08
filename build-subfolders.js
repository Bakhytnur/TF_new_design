const fs = require('fs')
const util = require('util')
const ftp = require('basic-ftp')
const exec = util.promisify(require('child_process').exec)
const buildFolder = './dist/'
const readlineSync = require('readline-sync')

const arg1 = process.argv[2]
const arg2 = process.argv[3]

if (arg1 === '?') {
  console.log(`
    Welcome to the build script!

    You can use parameters to handle building process:
    
    option=<build|deploy|all>
      build - create builds;
      deploy - copy builds throw ftp;
      all - perform 'build' and then 'deploy';
    If not presented, only build will be performed.

    app=<name_of_app>
      name_of_app defines which app should be built
      possible app names are presented in .env.mode... files
    If not presented, all apps will be handled.

    Have a nice day!
    `)
} else {
  const params = {
    option: '',
    app: ''
  }
  readArg(arg1, params)
  readArg(arg2, params)
  doBatch(params.option, params.app)
}

function readArg(arg, params) {
  if (arg) {
    const argArr = arg.split('=')
    if (argArr[0] === 'option') {
      params.option = argArr[1]
    } else if (argArr[0] === 'app') {
      params.app = argArr[1]
    }
  }
}

async function createBuilds(app) {
  const dir = fs.readdirSync('./')
  const envFiles = dir.filter((el) => {
    return el.match(/^\.env\.mode\w+/)
  })

  for (const envFile of envFiles) {
    const buildName = envFile.substring(9)
    if (app && app !== buildName) {
      continue
    }
    console.log(`Building ${buildName} ...`)
    await exec(
      `mkdir -p ./log && pnpm vue-cli-service build --mode=mode${buildName} --dest='${buildFolder}${buildName}' > ./log/build-${buildName}.log 2>&1`
    )
  }
}

async function deployBuilds(ftpUsername, ftpPassword, app) {
  const dir = fs.readdirSync(buildFolder)
  const builds = dir.filter((el) => {
    return el.match(/^\w+/)
  })

  const client = new ftp.Client()
  client.ftp.verbose = false
  try {
    await client.access({
      host: 'www.tfapps.ru',
      user: ftpUsername,
      password: ftpPassword,
      secure: false
    })
  } catch (err) {
    console.log(err)
  }

  for (const buildName of builds) {
    if (app && app !== buildName) {
      continue
    }
    console.log(`Adding apache config ${buildName} ...`)
    const apacheConfig = `
        <IfModule mod_rewrite.c>
          RewriteEngine On
          RewriteBase /${buildName}/
          RewriteRule ^index\\.html$ - [L]
          RewriteCond %{REQUEST_FILENAME} !-f
          RewriteCond %{REQUEST_FILENAME} !-d
          RewriteRule . /${buildName}/index.html [L]
        </IfModule>`

    fs.writeFileSync(
      `./${buildFolder}${buildName}/.htaccess`,
      apacheConfig,
      (err) => console.log(err)
    )

    try {
      console.log(`Clearing remote folder /${buildName} ...`)
      await client.ensureDir(`/${buildName}`)
      await client.clearWorkingDir()
      console.log(
        `Uploading from ${buildFolder}${buildName} to /${buildName} ...`
      )
      await client.uploadFromDir(`${buildFolder}${buildName}`)
    } catch (err) {
      console.log(err)
    }
  }
  client.close()
}

async function doBatch(option, app) {
  let ftpUsername
  let ftpPassword
  if (option === 'all' || option === 'deploy') {
    ftpUsername = readlineSync.question('Enter ftp user name: ')
    ftpPassword = readlineSync.question('Enter ftp password: ', {
      hideEchoBack: true
    })
  }
  if (!option || option === 'build' || option === 'all') {
    await createBuilds(app)
  }
  if (option === 'deploy' || option === 'all') {
    await deployBuilds(ftpUsername, ftpPassword, app)
  }
  console.log('Job finished.')
}
