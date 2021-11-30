import React, { Component, useEffect, useState } from 'react';
import { Alert, Text, View, Image, ScrollView, TextInput, StyleSheet, FlatList, Button } from 'react-native';
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

// Represents a post (consists of user avatar, username, image attachment, post title, and post body (post text))
class PostItem extends Component {
	render() {
		return (
			<View style={{ 
				flex: 1, 
				flexDirection: 'column', 
			}}>
				{/* For the user avatar and username, set flexDirection to row so they can be on same line */}
				<View style={{
					flexDirection: 'row',
				}}>
					{/* Displays user's avatar */}
					<TouchableOpacity>
						<Image
						source = {{uri: this.props.item.Avatar}}
						style={{ width: 100, height: 100, borderRadius: 200/2, marginTop: 22, marginBottom: 22, marginLeft: 22 }}>
						</Image>
					</TouchableOpacity>
					{/* Displays username */}
					<Text style={{ padding: 10, fontSize: 16, marginTop: 52 }}>{this.props.item.Username}</Text>
				</View>
				{/* Display main image attachment */}
				<Image 
					source = {{uri: this.props.item.Image_attachment}}
					style={{ height: 500 }}>
				</Image>
				<View style={{ 
					flex: 1, 
					flexDirection: 'column', 
					//height: 100 
				}}>
					{/* For like, comment and share buttons, set flexDirection to row so they can be on same line */}
					<View style = {{
						flexDirection: 'row',
					}}>
						{/* Display like button */}
						<TouchableOpacity>
							<Image
								source = { require("../assets/like-icon.png") }
								style = {{ width: 50, height: 50, marginTop: 22, marginLeft: 22 }}>
							</Image>
						</TouchableOpacity>
						{/* Display comment button */}
						<TouchableOpacity>
							<Image
								source = { require("../assets/comment-icon.png") }
								style = {{ width: 50, height: 50, marginTop: 22, marginLeft: 22 }}>
							</Image>
						</TouchableOpacity>
						{/* Display share button */}
						<TouchableOpacity>
							<Image
								source = { require("../assets/share-icon.png") }
								style = {{ width: 50, height: 50, marginTop: 22, marginLeft: 22 }}>
							</Image>
						</TouchableOpacity>
					</View>
					{/* Displays post title and post body (post text) */}
					<Text style={{ padding: 10, fontSize: 20 }}>{this.props.item.Post_title}</Text>
					<Text style={styles.flatListItem}>{this.props.item.Body}</Text>
				</View>
			{/* Creates a thin border between each post */}
			<View style={{
				height: 1,
				backgroundColor: 'white'
			}}>
			</View>
		</View>
		);
	}
}


const HomeScreen = ({ navigation }) => {

	const [posts, setPosts] = React.useState(null);

	// useEffect ensures that the retrievePosts function is run immediatedly once the HomeScreen is loaded
	React.useEffect(() => {
		// Function that gets post data from the database
		async function retrievePosts() {
			const data = await PostService.getAllPostsAsync();
			setPosts(data);
			
			if (data) {
				// Display pop up of data
				Alert.alert('Read Success', JSON.stringify(data, null, 2));
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
			
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#b3e5fc',
		alignItems: 'center',
		justifyContent: 'center',
	},
	overlay: {
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'gray'
	},
	flatListItem: {
		padding: 10,
		fontSize: 16,
	}
});

export default HomeScreen;
