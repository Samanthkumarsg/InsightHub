const { app, BrowserWindow } = require('electron')
const os = require('os');
const systemInformation = require('systeminformation');


  const createWindow = ()=>{
    
    const window = new BrowserWindow({
        width:1200,
        height:620
    });

    
  // Get hardware specifications
  systemInformation.get({
    cpu: 'manufacturer, brand, speed, cores, physicalCores',
    memory: 'total, free',
    graphics: 'controllers',
    osInfo: 'platform, distro, release, arch',
    diskLayout: 'name, type, size, interfaceType',
    battery: 'manufacturer, model, currentCapacity, maxCapacity, percent',
    networkInterfaces: 'iface, mac, ip4, ip6',
  }).then(data => {
    window.loadFile('index.html', { query: { deviceInfo: JSON.stringify(data) } });
    console.log(data)
  }).catch(error => {
    console.error('Error retrieving hardware information:', error);
  });


}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

console.log("Samanth is running electron");