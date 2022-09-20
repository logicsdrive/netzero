module.exports = {
  lintOnSave: true,

  css: {
    loaderOptions: {
      sass: {
        prependData: `
              @import "@/assets/sccs/styles.scss";
            `,
      },
    },
  },

  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = process.env.APP_TITLE;
      return args;
    });
  },
};
