import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const defaultImage = 'https://img.freepik.com/free-vector/we-are-open-shop-young-pine-trees_23-2148548812.jpg?w=826&t=st=1726169293~exp=1726169893~hmac=475c3f59fe5f62cede710763b35073fb02ead324a0c895f690bd851bb89d7a6c'; // Replace with your default image URL

const fertilizers = [
  { id: '1', name: 'Urea', imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2022/1/HD/ON/MT/145400703/urea-n46.jpg' },
  { id: '2', name: 'DAP', imageUrl: 'https://m.media-amazon.com/images/I/51EVXfRQMRL.AC_UF1000,1000_QL80.jpg' },
  { id: '3', name: 'MOP', imageUrl: 'https://5.imimg.com/data5/ANDROID/Default/2023/4/302421122/UO/BU/CK/96431087/product-jpeg.jpg' },
  { id: '4', name: 'NPK', imageUrl: 'https://organicbazar.net/cdn/shop/products/Bio-NPK-Fertilizer-Liquid-for-Organic-Gardening.jpg?v=1694169192' },
  { id: '5', name: 'Ammonium Nitrate', imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2020/8/HZ/TX/HE/95667856/ammonium-nitrate-500x500.jpg' },
]; // Replace with your actual fertilizer images
const Seeds = [
  { id: '1', name: 'Wheat', imageUrl: 'https://m.media-amazon.com/images/I/815+LTlhAJL.jpg' },
  { id: '2', name: 'Maize', imageUrl: 'https://agribee.in/wp-content/uploads/2024/08/9081-1.webp' },
  { id: '3', name: 'Cotton', imageUrl: 'https://inputs.kalgudi.com/data/p_images/1650689340197.jpeg' },
  { id: '4', name: 'Peas', imageUrl: 'https://agripari.com/wp-content/uploads/2023/08/ROSHNI.jpg' },
];
const Store = () => {
  const [location, setLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocation({ latitude, longitude });
      fetchNearbyStores(latitude, longitude); 
    })();
  }, []);

  // Fetch nearby fertilizer stores using Google Places API
  const fetchNearbyStores = async (latitude, longitude) => {
    const apiKey = 'AIzaSyDouSDXuZs-C61VHt6eJiIgP4ndfv41pDU'; 
    const radius = 30000; // 10 km
    const keyword = 'fertilizer'; 
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=${keyword}&key=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      let storesWithPhotos = response.data.results.map((store) => {
        if (store.photos && store.photos.length > 0) {
          const photoReference = store.photos[0].photo_reference;
          store.photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
        }
        return store;
      });
  
      storesWithPhotos = storesWithPhotos.sort((a, b) => b.rating - a.rating);
  
      setStores(storesWithPhotos);
    } catch (error) {
      console.error(error);
      setErrorMsg('Error fetching nearby stores.');
    }
  };

//   // Open store location in Google Maps
//   const openGoogleMaps = (lat, lng) => {
//     const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
//     Linking.openURL(url);
//   };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Agri shops FlatList */}
      <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Agri Shops</Text>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : stores.length > 0 ? (
        <FlatList
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 10 }}
          data={stores}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <View
              style={{
                margin: 10,
                width: 150, 
                height: 180,
                marginRight: 10, 
                backgroundColor: 'white',
                borderRadius: 20,
                alignItems: 'center',
                shadowColor:'#3D3B40',
              borderColor:'#3D3B40',
              elevation:4,
              }}
            >
              <Image
                source={{ uri: item.photoUrl || defaultImage }}
                style={{ width: 150, height: 120, marginBottom: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                resizeMode="cover"
              />
              <TouchableOpacity onPress={() => openGoogleMaps(item.geometry.location.lat, item.geometry.location.lng)}>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#1E2A5E',
                    textAlign: 'center',
                  }}
                  numberOfLines={2} 
                  adjustsFontSizeToFit 
                  minimumFontScale={0.8} 
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text>Loading nearby stores...</Text>
      )}

      {/* Fertilizers FlatList */}
      <Text style={{ fontSize: 26, fontWeight: 'bold', marginTop: 0 }}>Fertilizers</Text>
      <FlatList
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 10 }} 
        data={fertilizers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              margin: 10,
              width: 150, 
              height: 160,
              marginRight: 10, 
              backgroundColor: 'white',
              borderRadius: 20,
              alignItems: 'center',
              shadowColor:'#3D3B40',
              borderColor:'#3D3B40',
              elevation:4,
            }}
          >
            <Image
              source={{ uri: item.imageUrl || defaultImage }}
              style={{ width: 150, height: 120, marginBottom: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
              resizeMode="cover"
            />
            <Text
              style={{
                paddingHorizontal: 10,
                fontSize: 13,
                fontWeight: 600,
                color: '#1E2A5E',
                textAlign: 'center',
              }}
              numberOfLines={2} 
              adjustsFontSizeToFit 
              minimumFontScale={0.8}
            >
              {item.name}
            </Text>
          </View>
        )}
      />
      <Text style={{ fontSize: 26, fontWeight: 'bold', marginTop: 0 }}>Seeds</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 10 }} 
        data={Seeds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              margin: 10,
              width: 150, 
              height: 160,
              marginRight: 10, 
              backgroundColor: 'white',
              alignItems: 'center',
              borderRadius:20,
              shadowColor:'#3D3B40',
              borderColor:'#3D3B40',
              elevation:4,
            }}
          >
            <Image
              source={{ uri: item.imageUrl || defaultImage }}
              style={{ width: 150, height: 120, marginBottom: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
              resizeMode="cover"
            />
            <Text
              style={{
                paddingHorizontal: 10,
                fontSize: 13,
                fontWeight: 600,
                color: '#1E2A5E',
                textAlign: 'center',
                
              }}
              numberOfLines={2}
              adjustsFontSizeToFit 
              minimumFontScale={0.8} 
            >
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Store;
