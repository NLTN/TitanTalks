import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  RefreshControl,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as PostService from '../services/PostService';

// An array of mock data for posts
let MOCKDATA = [
	{
		Post_id: 1,
		Post_title: "Mock Post 1",
		Username: "Mock Username 1",
		Avatar: 'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
		Attach_id: 1,
		Image_attachment: 'https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
		Body: 'Mock description.'
	},
	{
		Post_id: 2,
		Post_title: "Mock Post 2",
		Username: "Mock Username 2",
		Avatar: 'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
		Attach_id: 2,
		Image_attachment: 'https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
		Body: 'Mock description 2.'
	}
]

const HomeScreen = ({ navigation }) => {

	const [posts, setPosts] = React.useState(null);

	// useEffect ensures that the retrievePosts function is run immediatedly once the HomeScreen is loaded
	React.useEffect(() => {
		// Function that gets post data from the database
		async function retrievePosts() {
			const serverResponse = await PostService.getAllPostsAsync();
			setPosts(serverResponse.data);
			
			if (serverResponse) {
				// Display pop up of data
				Alert.alert('Read Success', JSON.stringify(serverResponse, null, 2));
			}
		}
		retrievePosts();
	}, []);

	// Display posts variable in console to confirm that it has the post JSON data
	console.log("Post Data:")
	console.log(posts)

	// Need to find a way to display the posts variable in return()
	return (
		<View>
			<FlatList
				data={posts}
				renderItem={({item})=>
				<View
				style={{
				  flex: 1,
				  flexDirection: "column",
				}}
			  >
				{/* For the user avatar and username, set flexDirection to row so they can be on same line */}
				<View
				  style={{
					flexDirection: "row",
					alignItems: "center",
					backgroundColor: "#e6edff",
				  }}
				>
				  {/* Displays user's avatar */}
				  <Image
					source={{ uri: item.user.avatar }}
					style={styles.user_avatar}
				  ></Image>
				  {/* Displays username */}
				  <Text
					style={{
					  paddingLeft: 8,
					  fontSize: 20,
					  fontWeight: "bold",
					}}
				  >
					{item.user.nickname}
				  </Text>
				</View>
				{/* Display main image attachment */}
				<Image
				  source={{ uri: item.files[0].file_location }}
				  style={{ height: 480 }}
				></Image>
				<View
				  style={{
					flex: 1,
					flexDirection: "column",
					height: 130,
				  }}
				>
				  {/* For like, comment and share buttons, set flexDirection to row so they can be on same line */}
				  <View
					style={{
					  flexDirection: "row",
					  backgroundColor: "white",
					}}
				  >
					{/* Display like button */}
					<TouchableOpacity>
					  <Image
						source={require("../assets/like-icon.png")}
						style={{ width: 30, height: 30, marginTop: 8, marginLeft: 8 }}
					  ></Image>
					</TouchableOpacity>
					{/* Display comment button */}
					<TouchableOpacity>
					  <Image
						source={require("../assets/comment-icon.png")}
						style={{ width: 30, height: 30, marginTop: 8, marginLeft: 10 }}
					  ></Image>
					</TouchableOpacity>
					{/* Display share button */}
					<TouchableOpacity>
					  <Image
						source={require("../assets/share-icon.png")}
						style={{ width: 30, height: 30, marginTop: 8, marginLeft: 10 }}
					  ></Image>
					</TouchableOpacity>
				  </View>
				  {/* Displays post title and post body (post text) */}
				  <Text style={styles.likesRow}>
					{item.likes + " likes" /*likes row */}
				  </Text>
				  <View
					style={{
					  flex: 1,
					  flexDirection: "row",
					  alignItems: "center",
					  backgroundColor: "white",
					}}
				  >
					<Text
					  style={{
						paddingLeft: 8,
						fontSize: 17,
						fontWeight: "bold",
					  }}
					>
					  {item.user.nickname}
					</Text>
					<Text style={styles.caption}>{item.content}</Text>
				  </View>
		
				  {/*<Text style={styles.flatListItem}>{this.props.item.Body}</Text>
					Have removed it now to add dynamic expansion of caption later
				   */}
				  <Text style={styles.more}>...more</Text>
				</View>
			  </View>
				}
			></FlatList>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: "#b3e5fc",
	  alignItems: "center",
	  justifyContent: "center",
	},
	overlay: {
	  height: 100,
	  alignItems: "center",
	  justifyContent: "center",
	  backgroundColor: "gray",
	},
	user_avatar: {
	  width: 50,
	  height: 50,
	  borderRadius: 50,
	  marginTop: 10,
	  marginBottom: 10,
	  marginLeft: 8,
	  borderColor: "blue",
	  borderWidth: 1.5,
	},
	flatListItem: {
	  padding: 5,
	  paddingBottom: 10,
	  fontSize: 16,
	  backgroundColor: "white",
	},
	likesRow: {
	  backgroundColor: "white",
	  paddingLeft: 8,
	  paddingTop: 8,
	  fontSize: 18,
	  fontWeight: "bold",
	},
	caption: {
	  fontSize: 18,
	  paddingLeft: 5,
	  fontWeight: "400",
	  backgroundColor: "white",
	},
	more: {
	  fontSize: 17,
	  paddingLeft: 8,
	  backgroundColor: "white",
	  color: "#6B6B6B",
	},
  });

export default HomeScreen;
