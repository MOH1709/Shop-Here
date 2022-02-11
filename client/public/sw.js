this.addEventListener("push", (e) => {
  const data = e.data.json();

  this.registration.showNotification(data.title, {
    body: data.message,
    icon: "./logo.png",
  });
});