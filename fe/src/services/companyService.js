// src/services/companyService.js

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let companies = [
  {
    id: 1,
    name: "Công ty A",
    address: "123 Đường ABC",
    phone: "0909123456",
    email: "congtyA@example.com",
  },
];

export default {
  getAllCompanies: async () => {
    await delay(500);
    return { data: [...companies] };
  },

  createCompany: async (data) => {
    await delay(500);
    const newCompany = { ...data, id: Date.now() };
    companies.push(newCompany);
  },

  updateCompany: async (id, data) => {
    await delay(500);
    companies = companies.map((c) => (c.id === id ? { ...c, ...data } : c));
  },

  deleteCompany: async (id) => {
    await delay(500);
    companies = companies.filter((c) => c.id !== id);
  },
};