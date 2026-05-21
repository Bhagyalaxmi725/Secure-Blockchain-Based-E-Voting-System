const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

let port = null;
let parser = null;
let isConnected = false;

// Connect to Arduino
const connectArduino = (comPort = 'COM3') => {
  return new Promise((resolve, reject) => {
    port = new SerialPort({
      path: comPort,
      baudRate: 9600,
    });

    parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

    port.on('open', () => {
      isConnected = true;
      console.log('✅ Arduino connected on ' + comPort);
      resolve(true);
    });

    port.on('error', (err) => {
      isConnected = false;
      console.log('❌ Arduino error:', err.message);
      reject(err);
    });
  });
};

// Send command to Arduino
const sendCommand = (command) => {
  if (!isConnected || !port) return false;
  port.write(command + '\n');
  return true;
};

// Wait for response from Arduino
const waitForResponse = (timeout = 30000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Arduino timeout'));
    }, timeout);

    parser.once('data', (data) => {
      clearTimeout(timer);
      resolve(data.trim());
    });
  });
};

// Enroll fingerprint
const enrollFingerprint = async () => {
  sendCommand('ENROLL');
  const response = await waitForResponse(30000);
  if (response.startsWith('ENROLL_SUCCESS')) {
    const id = response.split(':')[1];
    return { success: true, fingerprint_id: parseInt(id) };
  }
  return { success: false };
};

// Verify fingerprint
const verifyFingerprint = async (fingerprintId) => {
  sendCommand('VERIFY:' + fingerprintId);
  const response = await waitForResponse(30000);
  if (response.startsWith('VERIFY_SUCCESS')) {
    return { success: true, matched: true };
  }
  return { success: false, matched: false };
};

const getStatus = () => ({ isConnected });

module.exports = {
  connectArduino,
  enrollFingerprint,
  verifyFingerprint,
  getStatus,
};