import { webAppUrl } from './constants';

const restaurant_id = 2;

interface InlineKeyboardButton {
  text: string;
  web_app?: { url: string };
  callback_data?: string;
}

interface ReplyMarkup {
  inline_keyboard?: InlineKeyboardButton[][];
  keyboard?: { text: string; request_contact?: boolean }[][];
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
}

interface Menu {
  reply_markup: ReplyMarkup;
}

const startMainMenu_Production: Menu = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'Open Menu !',
          web_app: { url: `${webAppUrl}?restaurant_id=${restaurant_id}` },
        },
      ],
    ],
  },
};

// const startMainMenu_Production222: Menu = {
//   reply_markup: {
//     inline_keyboard: [
//       [
//         {
//           text: 'click to open menu',
//           callback_data: 'auth',
//           web_app: { url: webAppUrl },
//         },
//       ],
//     ],
//     resize_keyboard: true,
//     one_time_keyboard: true,
//   },
// };

const callToAdminMenu: Menu = {
  reply_markup: {
    keyboard: [
      [
        {
          text: 'Contact the admin',
          request_contact: true,
        },
      ],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};

const only_keyboard_callToAdminMenu: ReplyMarkup = {
  keyboard: [
    [
      {
        text: 'Write To Support',
        request_contact: true,
      },
    ],
  ],
};

const settings_message = {
  parse_mode: 'HTML' as const,
  disable_web_page_preview: true,
};

export {
  settings_message,
  startMainMenu_Production,
  callToAdminMenu,
  only_keyboard_callToAdminMenu,
};