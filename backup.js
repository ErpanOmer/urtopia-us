const { exec, spawn } = require('node:child_process');
const package = require('./package.json')

const now = new Date()

const year = `${now.getFullYear()}`
const month = (`${now.getMonth() + 1}`).padStart(2, '0')
const day = (`${now.getDate()}`).padStart(2, '0')

const store = package.store
const version = `v${year}.${month}.${day}`
const theme = `${package.name}-backup[${version}]`
let step = 1


function run (command) {
    console.log(`step:${step} -------> ${command}`)
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                return reject(err)
            }

            const out = stdout.toString()

            step !== 1 && console.log(out)
            resolve(out)
            step++
        })
    })
}




run(`shopify theme list -s ${store} --role unpublished`).then(async list => {
    try {
        await run(`git checkout master`)
        await run(`git checkout -B ${version}`)
        await run(`npm run pull`)
        await run(`git push origin ${version} -f`)

        // 如果存在 则删除
        list.includes(theme) && await run(`shopify theme delete -s ${store} -t ${theme} -f`)
        await run(`shopify theme push --unpublished -s ${store} -t ${theme}`)
        await run(`git checkout master`)
    } catch (error) {
        console.error(error)
    }

})