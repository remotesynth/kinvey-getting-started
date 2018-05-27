const client = Kinvey.init({
  appKey: 'kid_HyHDjW6nz',
  appSecret: '5dad0a434cbf40549ff926c577403e54'
});

const activeUser = Kinvey.User.getActiveUser(client);

function loadDataStore() {
  const dataStore = Kinvey.DataStore.collection('employees');
  const stream = dataStore.find();
  stream.subscribe(
    (employees) => {
      console.log('data retrieved');
      const el = document.getElementById('allEmployees');
      el.innerHTML = '';
      employees.forEach((employee) => {
        el.innerHTML += `
          <li>
            <img src="https://raw.githubusercontent.com/remotesynth/kinvey-data-connect-sample/master/images${employee.photo}">
            <h3>${employee.name}</h3>
            <p>Status: ${employee.status}</p>
          </li>`;
      });
    },
    (error) => {
      console.log(error);
    }
  );
}

if (!activeUser) {
  Kinvey.User.signup()
    .then(() => {
      loadDataStore();
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  loadDataStore();
}