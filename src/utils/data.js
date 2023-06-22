import raw from '../assets/data.csv';
const csv = require('csvtojson');

export async function fetchData() {
    let rawData = await fetch(raw);
    rawData = await rawData.text();
    return csv().fromString(rawData);
}

export async function createTree() {
    const rawData = await fetchData();
    const treeMap = {};
    let root;
    rawData.forEach((dataPoint) => {
        if(dataPoint["Father's ID"] === '0') root = dataPoint.ID;
        treeMap[dataPoint.ID] = dataPoint;
        treeMap[dataPoint.ID].children = [];
    });
    rawData.forEach((dataPoint) => {
        if(dataPoint["Father's ID"] === '0') return;
        treeMap[dataPoint["Father's ID"]].children.push(dataPoint.ID);
    });
    return {
        tree: treeMap,
        root
    };
}