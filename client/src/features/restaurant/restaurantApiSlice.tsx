import apiSlice from "../../app/api/apiSlice";

export const restaurantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurant: builder.query({
      query: (slug) => ({
        url: `/public/restaurant/${slug}`,
        method: "GET",
      }),
    }),
    getRestaurants: builder.query({
      query: () => ({
        url: "/public/restaurants",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRestaurantQuery, useGetRestaurantsQuery } =
  restaurantApiSlice;
