const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')()

const axios = require('axios')

const config = {
    client_id: '15b82138a9cb538eb8a0',
    client_secret: 'a7530e94b32aa2e17a9ee10d830f688f49fb8afe',
}

const app = new koa()
app.use(bodyParser())

router.post('/proxy', async (ctx, next) => {
    const { code } = ctx.request.body
    console.log('code', code)
    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code
    }
    try {
        const res = await axios.post('https://github.com/login/oauth/access_token', params)
        const access_token = res.data.split('&')[0].split('=')[1]
        console.log('res.data', res.data)
        ctx.body = {
            access_token
        }
    } catch (err) {
        console.log(err)
        ctx.body = { err: err }
    }

})

app.use(router.routes())

app.listen(3003, () => {
    console.log('server is running at http://localhost:3003')
})