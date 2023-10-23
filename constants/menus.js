const { webAppUrl } = require("../constants/constants.js")
 

const startMainMenu_Production = {
  inline_keyboard: [
    [
      {
        text: "Open Menu",
        web_app: { url: webAppUrl },
      },
    ],
  ],
}

//===================================
    

const startMainMenu_Production222 = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "click to open menu",
          callback_data: 'auth',
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
const callToAdminMenu = {
  reply_markup: {
    keyboard: [
      [
        {
          text: "Contact the admin",
          request_contact: true,
        },
      ],
    ],
    resize_keyboard: true, // Разрешить изменение размера клавиатуры
    one_time_keyboard: false, // Не скрывать клавиатуру после нажатия на кнопку
  },
}


const settings_message = {
  parse_mode: "HTML",
  //disable because we don't want show description links
  disable_web_page_preview: true,
}


module.exports = {
  webAppUrl,
  settings_message,
  give_me_keyboard,
  startMainMenu_Production,
  //  inline_keyboard,
  callToAdminMenu,
}
