// utils/exportUtils.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToCSV = (data, filename) => {
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(field => JSON.stringify(row[field])).join(','))
  ].join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const exportToPDF = (data, title, filename) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  doc.autoTable({
    startY: 30,
    head: [Object.keys(data[0])],
    body: data.map(row => Object.values(row)),
  });
  doc.save(`${filename}.pdf`);
};