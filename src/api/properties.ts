import random from "lodash/random";
import { promisedTimeout } from "../helpers/timeout.ts";

export interface SearchResponse {
  results: Property[];
  page: number;
  pageSize: number;
  pageTotal: number;
}

export interface Property {
  id: number;
  title: string;
  price: number;
  city: "" | "Atlanta" | "New York";
  rooms: number;
  picture: string;
  isLiked: boolean;
}

export interface PropertySearchFilters {
  pageSize?: number;
  page?: number;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
}

export function fetchProperties(
  filters: PropertySearchFilters = {}
): Promise<SearchResponse> {
  return promisedTimeout(
    random(1000, 2000),
    structuredClone(filterProperties(filters))
  ).then((response) => {
    console.info("🛜 NETWORK: GET", filters, response);
    return response;
  });
}

export function likeProperty(id: number, value: boolean): Promise<Property> {
  const foundProperty = properties.find((p) => p.id === id);

  if (!foundProperty) {
    return promisedTimeout<any>(random(1000, 2000), "Property not found", true);
  }

  foundProperty.isLiked = value;
  return promisedTimeout(random(1000, 2000), structuredClone(foundProperty));
}

const titles = [
  "High-Rise Luxury Condo",
  "Chic Downtown Loft",
  "Modern City Apartment",
  "Elegant Penthouse Suite",
  "Stylish Studio",
  "Contemporary Urban Flat",
  "Executive City Center Apartment",
  "Sophisticated Townhouse",
  "Cosmopolitan Residence",
  "Skyline View High-Rise",
  "Urban Oasis Apartment",
  "City Center Retreat",
  "Trendy Neighborhood Flat",
  "Upscale Urban Home",
  "Metropolitan Executive Suite",
  "Central City Living Space",
  "Fashionable Urban Condo",
  "Sleek City Loft",
  "Dynamic Urban Dwelling",
  "Metropolitan Penthouse",
  "Cityscape Apartment",
  "Urban Elegance Suite",
  "Central Business District Flat",
  "Modernist Urban Abode",
  "City Chic Residence",
];

function generateURL(title: string): string {
  return `/property_img/${title}.jpg`;
}

const getRandomPrice = () =>
  Math.floor(Math.random() * (2500 - 200 + 1)) + 1000;
const getRandomRooms = () => Math.floor(Math.random() * 5) + 1;
const getRandomCity = () => (Math.random() < 0.5 ? "Atlanta" : "New York");

const properties: Property[] = titles.map((title, index) => ({
  id: index,
  title: title,
  price: getRandomPrice(),
  city: getRandomCity(),
  rooms: getRandomRooms(),
  picture: generateURL(title),
  isLiked: false,
}));

function filterProperties(filters: PropertySearchFilters): SearchResponse {
  const {
    pageSize = 10,
    page = 1,
    minPrice = 0,
    maxPrice = Number.MAX_SAFE_INTEGER,
    city = "",
  } = filters;

  if (!pageSize) {
    return {
      results: [],
      page,
      pageSize,
      pageTotal: 0,
    };
  }

  const filteredProperties = properties.filter((property) => {
    return (
      property.price >= minPrice &&
      property.price <= maxPrice &&
      (city === "" || property.city === city)
    );
  });

  return {
    results: filteredProperties.slice((page - 1) * pageSize, page * pageSize),
    page,
    pageSize,
    pageTotal: Math.ceil(filteredProperties.length / pageSize),
  };
}
