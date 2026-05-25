export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const createRequest = (route) => {
    const query = {};
    let promise;

    const request = {
      param(key, value) {
        query[key] = value;
        return request;
      },
      execute() {
        if (promise) {
          return promise;
        }

        const endpoint = config.public.wpApiEndpoint.replace(/\/$/, "");
        promise = $fetch(`${endpoint}/greenspro-cor/${route}`, {
          query,
        });

        return promise;
      },
      then(onFulfilled, onRejected) {
        return request.execute().then(onFulfilled, onRejected);
      },
      catch(onRejected) {
        return request.execute().catch(onRejected);
      },
      finally(onFinally) {
        return request.execute().finally(onFinally);
      },
    };

    return request;
  };

  const wp = {
    page: () => createRequest("page"),
    news: () => createRequest("news"),
    post: () => createRequest("post"),
    profiles: () => createRequest("profiles"),
    events: () => createRequest("events"),
    event: () => createRequest("event"),
    settings: () => createRequest("settings"),
  };

  return {
    provide: {
      wp,
    },
  };
});
