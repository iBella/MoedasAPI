const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
        return {
            bd_string: 'mongodb+srv://admin_moedas:admin_moedas@clusterapi-w9p6q.mongodb.net/test?retryWrites=true&w=majority',
            jwt_senha: 'senhatoken',
            jwt_tempo_token: '7d'
        }
        case 'hml':
        return {
            bd_string: 'mongodb+srv://admin_moedas:admin_moedas@clusterapi-w9p6q.mongodb.net/test?retryWrites=true&w=majority',
            jwt_senha: 'senhatoken',
            jwt_tempo_token: '7d'
        }
        case 'prod':
        return {
            bd_string: 'mongodb+srv://admin_moedas:admin_moedas@clusterapi-w9p6q.mongodb.net/test?retryWrites=true&w=majority',
            jwt_senha: 'senhatoken',
            jwt_tempo_token: '7d'
        }
    }
}

console.log(`Iniciando a API em ambiente ${env}`);

module.exports = config();