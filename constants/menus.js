const { webAppUrl } = require("../constants/constants.js")
const restaurant_name = "cafacafe"

const only_inline_keyboard = {
  inline_keyboard: [
    [
      {
        text: "Open Menu",
        // web_app: { url: webAppUrl },
        web_app: { url: `${webAppUrl}?restaurant_name=${restaurant_name}` },
      },
    ],
  ],
}

const startMainMenu_Production = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "Open Menu !",
          web_app: { url: `${webAppUrl}?restaurant_name=${restaurant_name}` },
        },
      ],
    ],
  },
}

//===================================

const startMainMenu_Production222 = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "click to open menu",
          callback_data: "auth",
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
      //     text: "Test Pay",
      //     callback_data: "test_pay",
      //   },
      // ],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
}

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

const only_keyboard_callToAdminMenu = {
  keyboard: [
    [
      {
        text: "Write To Support",
        request_contact: true,
      },
    ],
  ],
}

const settings_message = {
  parse_mode: "HTML",
  //disable because we don't want show description links
  disable_web_page_preview: true,
}

module.exports = {
  only_inline_keyboard,
  settings_message,
  startMainMenu_Production,
  callToAdminMenu,
  only_keyboard_callToAdminMenu,
}
