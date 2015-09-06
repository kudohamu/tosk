import keyMirror from 'keymirror-nested';

export default {
  TITLE: 'Tosk',

  RootUrl: {
    SERVER: "http://localhost:4000/api",
    CLIENT: "http://localhost:3000/#"
  },

  PayloadSources: keyMirror({
    VIEW_ACTION: null,
    SERVER_ACTION: null
  }),

  PAGE: {
    TOP: 'Top',
    DASHBOARD: 'Dashboard',
    SETTINGS: 'Settings',
    SIGN_UP: 'SignUp',
    SIGN_OUT: 'SignOut',
    LOADING: 'Loading',    
  },

  SIDEBAR: {
    ACTIVES  : 'Actives',
    TEMPLATES: 'Templates',
    MEMBERS  : 'Members',
    SETTINGS : 'Settings',
    LOGS     : 'Logs',
  },

  ActionTypes: keyMirror({
    PAGE: {
      CHANGE: null,
    },
    USER: {
      SIGN_UP: {
        CHANGE_ICON: null,
        CHANGE_NAME: null,
        CHANGE_MAIL: null,
        CHANGE_PASSWORD: null,
        CHANGE_PASSWORD_CONFIRMATION: null,
      },

      CREATE: {
        REQUEST: null,
        SUCCESS_RESPONSE: null,
        ERROR_RESPONSE: null
      },
      SIGN_IN: {
        SUBMIT: null,
        SUCCESS_RESPONSE: null,
        ERROR_RESPONSE: null,
      },
      SIGN_OUT: null,
      SHOW: {
        SUCCESS_RESPONSE: null,
      },
      UPDATE: {
        SUCCESS_RESPONSE: null,
      },
    },
    BOARDS: {
      CHANGE_CURRENT: null,
      INDEX: {
        SUCCESS_RESPONSE: null,
        ERROR_RESPONSE: null,
      },
      CREATE: {
        SUCCESS_RESPONSE: null,
        ERROR_RESPONSE: null,
      },
      DELETE: {
        SUCCESS_RESPONSE: null,
        ERROR_RESPONSE: null,
      },
      UPDATE: {
        SUCCESS_RESPONSE: null,
      },
    },
    TODOS: {
      OPEN_FOLDER: null,
      CLEAR: null,
      INDEX: {
        SUCCESS_RESPONSE: null,
      },
      CREATE: {
        SUCCESS_RESPONSE: null,
      },
      DELETE: {
        SUCCESS_RESPONSE: null,
      },
      CHANGE: {
        SUCCESS_RESPONSE: null,
      }
    },
    NOTIFICATIONS: {
      PUSH: null,
      ERASE: null,
    },
  })
}
