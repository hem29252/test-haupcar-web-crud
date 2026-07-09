"use strict";

const { v4: uuidv4 } = require("uuid");
const { DATABASE_TABLES } = require("../constants/database-tables");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cars = [
      {
        id: uuidv4(),
        registration_number: "1กข1234",
        brand: "Toyota",
        model: "Corolla Altis",
        notes: "Assigned to sales department.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "2กค5678",
        brand: "Toyota",
        model: "Hiace",
        notes: "Used for daily deliveries.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "3ขง1122",
        brand: "Honda",
        model: "CR-V",
        notes: "Reserved for executive meetings.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "4คจ3344",
        brand: "Isuzu",
        model: "D-Max",
        notes: "Maintenance team vehicle.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "5งฉ5566",
        brand: "Mazda",
        model: "Mazda3",
        notes: "Used for client visits.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "6จช7788",
        brand: "Mitsubishi",
        model: "Triton",
        notes: "Transporting warehouse supplies.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "7ฉซ9900",
        brand: "Nissan",
        model: "Navara",
        notes: "IT support transportation.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "8ชญ1023",
        brand: "Honda",
        model: "Jazz",
        notes: "General office use.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "9ซฎ2045",
        brand: "Ford",
        model: "Ranger",
        notes: "For site inspections.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "1ฌฐ3067",
        brand: "Toyota",
        model: "Yaris Ativ",
        notes: "Driver training sessions.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "2ญฑ4089",
        brand: "MG",
        model: "HS",
        notes: "Intercity transportation.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "3ฎฒ5012",
        brand: "Hyundai",
        model: "Staria",
        notes: "Airport pickup service.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "4ฏณ6034",
        brand: "BYD",
        model: "Atto 3",
        notes: "Electric vehicle for city routes.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "5ฐด7056",
        brand: "Tesla",
        model: "Model 3",
        notes: "Assigned to management.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "6ฑต8078",
        brand: "Ford",
        model: "Ranger Wildtrak",
        notes: "Operations department.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "7ฒถ9090",
        brand: "Hyundai",
        model: "H-1",
        notes: "Monthly inspection vehicle.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "8ณท1113",
        brand: "Suzuki",
        model: "Swift",
        notes: "Backup vehicle.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "9ดธ2224",
        brand: "Mitsubishi",
        model: "Xpander",
        notes: "Assigned to Chiang Mai branch.",
      },
      {
        id: uuidv4(),
        registration_number: "1ตน3335",
        brand: "Honda",
        model: "City",
        notes: "Finance department transportation.",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        registration_number: "2ถบ4446",
        brand: "BMW",
        model: "iX3",
        notes: "Executive electric SUV.",
        created_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert(DATABASE_TABLES.Car, cars);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(DATABASE_TABLES.Car, null, {});
  },
};
