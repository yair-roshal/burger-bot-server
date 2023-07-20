const { webAppUrl } = require("../constants/constants.js")

const settings_message = {
  parse_mode: "HTML",
  //disable because we don't want show description links
  disable_web_page_preview: true,
}

const startMainMenu_Testing = {
  reply_markup: {
    // keyboard: [
    inline_keyboard: [
      [
        {
          text: "Open menu",
          // text: 'Open menu - heroku app',
          web_app: { url: webAppUrl },
        },
      ],

      // [
      //   {
      //     text: "Open menu - keyboard button",
      //     web_app: { url: webAppUrl + "/form" },
      //   },
      // ],

      // [
      //   {
      //     text: "About",
      //     callback_data: "about",
      //   },
      // ],

      // [
      //   {
      //     text: "Test Pay",
      //     callback_data: "test_pay",
      //   },
      // ],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
}

//===================================

const startMainMenu_Production = {
  reply_markup: {
    keyboard: [
      [
        {
          text: "Open menu",
          // text: 'Open menu - heroku app',
          web_app: { url: webAppUrl },
        },
      ],
    ],
  },
}

//==================================================================
// const inline_keyboard = {
//     reply_markup: {
//         inline_keyboard: [
//             [
//                 {
//                     text: 'Open menu',
//                     callback_data: 'open_menu',
//                 },
//             ],
//         ],
//     },
// }
//==================================
// const callToAdminMenu = {
//     reply_markup: {
//         keyboard: [
//             [
//                 {
//                     text: 'Contact the admin',
//                     request_contact: true,
//                 },
//             ],
//         ],
//     },
// }

module.exports = {
  webAppUrl,
  settings_message,

  startMainMenu_Production,
  startMainMenu_Testing,
  // inline_keyboard,
  // callToAdminMenu,
}
