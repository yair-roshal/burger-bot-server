const webAppUrl = 'https://heroic-puffpuff-e7da0d.netlify.app'

const settings_message = {
    parse_mode: 'HTML',
    //disable because we don't want show description links
    disable_web_page_preview: true,
}




const startMainMenu_Testing = {
    reply_markup: {
        // keyboard: [
        inline_keyboard: [
            [
                {
                    text: 'Open menu',
                    web_app: { url: webAppUrl },
                },
            ],

            [
                {
                    text: 'Fill out the Delivery form',
                    web_app: { url: webAppUrl + '/form' },
                },
            ],

            [
                {
                    text: 'About',
                    callback_data: 'about',
                },
            ],

            [
                {
                    text: 'Test Pay',
                    callback_data: 'test_pay',
                },
            ],
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
                    text: 'Fill out the Delivery form',
                    web_app: { url: webAppUrl + '/form' },
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
    callToAdminMenu,
}
