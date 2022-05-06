import './alias'

// ------------
// https

if (!process.env.FUNCTION_TARGET || process.env.FUNCTION_TARGET === 'lineBot') {
  exports.lineBot = require('./triggers/https/line-bot')
}

if (!process.env.FUNCTION_TARGET || process.env.FUNCTION_TARGET === 'stripeWebhook') {
  exports.stripeWebhook = require('./triggers/https/stripe-webhook')
}
