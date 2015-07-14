import keyMirror from 'keymirror-nested';

export default {
  RootUrl: {
    SERVER: "http://localhost:4000/api",
    CLIENT: "http://localhost:3000/#"
  },

  PayloadSources: keyMirror({
    VIEW_ACTION: null,
    SERVER_ACTION: null
  }),

  ActionTypes: keyMirror({
    USER: {
      SIGN_UP: {
        CHANGE_ICON: null,
        CHANGE_NAME: null,
        CHANGE_MAIL: null,
        CHANGE_PASSWORD: null,
        CHANGE_PASSWORD_CONFIRMATION: null,
        SUCCESS_RESPONSE: null,
        ERROR_RESPONSE: null
      },
      SIGN_IN: {
        SUBMIT: null,
        SUCCESS_RESPONSE: null,
        ERROR_RESPONSE: null,
      }
    },
    BOARDS: {
      INDEX: {
        SUCCESS_RESPONSE: null,
        ERROR_RESPONSE: null,
      },
      CREATE: {
        SUCCESS_RESPONSE: null,
        ERROR_RESPONSE: null,
      }
    }
  })
}
