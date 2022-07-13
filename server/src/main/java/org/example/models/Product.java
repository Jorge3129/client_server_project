package org.example.models;

public class Product {
   private int id;
   private String name;
   private String description;
   private String manufacturer;
   private double price;
   private int amount;

   private int groupId;

   public Product() {
   }

   public Product(int id, String name, int groupId, String description, String manufacturer, double price, int amount) {
      this.id = id;
      this.name = name;
      this.groupId = groupId;

      this.description = description;
      this.manufacturer = manufacturer;
      this.price = price;
      this.amount = amount;
   }

   public Product(int id, String name, int groupId, String description, String manufacturer, double price) {
      this.id = id;
      this.name = name;
      this.groupId = groupId;
      this.description = description;
      this.manufacturer = manufacturer;
      this.price = price;
   }

   public Product(String name, int groupId, String description, String manufacturer, double price) {
      this.name = name;
      this.groupId = groupId;
      this.description = description;
      this.manufacturer = manufacturer;
      this.price = price;
   }

   public Product(String name, int groupId, String description, String manufacturer, double price, int amount) {
      this.name = name;
      this.groupId = groupId;
      this.description = description;
      this.manufacturer = manufacturer;
      this.price = price;
      this.amount = amount;
   }

   public int getId() {
      return id;
   }

   public void setId(int id) {
      this.id = id;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public int getGroupId() {
      return groupId;
   }

   public void setGroupId(int groupId) {
      this.groupId = groupId;
   }

   public String getDescription() {
      return description;
   }

   public void setDescription(String description) {
      this.description = description;
   }

   public String getManufacturer() {
      return manufacturer;
   }

   public void setManufacturer(String manufacturer) {
      this.manufacturer = manufacturer;
   }

   public double getPrice() {
      return price;
   }

   public void setPrice(double price) {
      this.price = price;
   }

   public int getAmount() {
      return amount;
   }

   public void setAmount(int amount) {
      this.amount = amount;
   }
}
