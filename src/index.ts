import './alias'

const target = process.env.FUNCTION_TARGET

// ------------
// https

if (!target || target === 'lineBot') {
  exports.lineBot = require('./triggers/https/line-bot')
}

if (!target || target === 'stripeWebhook') {
  exports.stripeWebhook = require('./triggers/https/stripe-webhook')
}
