import React, { useEffect, useState } from "react";
import DataService from "../services/dataService"; // Adjust the path to your DataService module
import ItemsFilter from './ItemsFilter.jsx';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

const dataService = new DataService("http://localhost:8080"); // Replace with your API base URL

export default function Item() {
    const [itemsWithComments, setItemsWithComments] = useState([]);
    const [newComment, setNewComment] = useState({}); // Store new comments per item

    useEffect(() => {
        async function fetchItemsAndComments() {
            try {
                // Fetch all items
                const itemsData = await dataService.getItems();

                // Create an array to store items with their comments
                const itemsWithCommentsData = await Promise.all(itemsData.map(async (item) => {
                    // Fetch comments for each item
                    const commentsData = await dataService.getComments(item.ItemID);
                    // Combine item and comments data
                    return {
                        ...item,
                        comments: commentsData.length > 0 ? commentsData : "No comments yet"
                    };
                }));

                setItemsWithComments(itemsWithCommentsData);
                console.log(itemsWithCommentsData);
            } catch (error) {
                console.error("Error fetching items or comments:", error);
            }
        }

        fetchItemsAndComments();
    }, []);

    // Handle comment input changes
    const handleCommentChange = (e, itemID) => {
        setNewComment({
            ...newComment,
            [itemID]: e.target.value // Set comment for specific item
        });
    };

    // Handle comment submission
    const handleCommentSubmit = async (e, itemID) => {
        e.preventDefault();
        try {
            // Fetch existing comments to get the last commentID
            const existingComments = await dataService.getComments(itemID);
            
            // Find the highest commentID (ensure it's numeric)
            let lastCommentID = 0;
            if (existingComments.length > 0) {
                lastCommentID = Math.max(
                    ...existingComments.map(comment => {
                        const parsedID = parseInt(comment.commentID, 10);
                        return Number.isNaN(parsedID) ? 0 : parsedID;  // Default to 0 if commentID is NaN
                    })
                );
            }
    
            // Generate the next commentID by incrementing the last one
            const newCommentID = lastCommentID + 1;
    
            // Format today's date as dd/mm/yyyy
            const today = new Date();
            const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    
            // Log newCommentID for debugging
            console.log('newCommentID:', newCommentID);
    
            // Construct the new comment data
            const commentData = {
                commentID: newCommentID,
                itemID,
                comment: newComment[itemID],
                createdAt: formattedDate, // Use the formatted date
                userId: "someUserId" // Replace with actual user ID
            };
    
            // Log the comment data to be posted
            console.log("Posting comment data:", commentData);
    
            // Post the new comment to the backend
            await dataService.postComment(commentData);
    
            // Clear the comment input after successful submission
            setNewComment({ ...newComment, [itemID]: "" });
    
            // Optionally refetch the updated comments
            const updatedComments = await dataService.getComments(itemID);
            setItemsWithComments(itemsWithComments.map(item => 
                item.ItemID === itemID ? { ...item, comments: updatedComments } : item
            ));
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };
    
    


    return (
        <>
            <h1>Items</h1>
            <div>
                {itemsWithComments.map((item) => (
                    <div key={item.ItemID} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Card style={{ width: '75%', margin: '10px', textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Title></Card.Title>
                                <Card.Text>
                                    <Stack direction='horizontal' gap={3} className="justify-content-center">
                                    <div className='p-2'><b>CS#:</b>{item.cs}</div>
                                        <div className='p-2'><b>Serial#:</b>{item.serial}</div>
                                        <div className='p-2'><b>Location:</b>{item.location}</div>
                                        <div className='p-2'><b>Status:</b>{item.status}</div>
                                    </Stack>
                                </Card.Text>
                            </Card.Body>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey={item.cs}>
                                    <Accordion.Header>Comments</Accordion.Header>
                                    <Accordion.Body style={{textAlign: 'left'}}>
                                        {Array.isArray(item.comments) ? (
                                            item.comments.length > 0 ? (
                                                item.comments.map((comment) => (
                                                    <p key={comment.commentID}>{comment.comment}</p>
                                                ))
                                            ) : (
                                                <p>No comments available.</p>
                                            )
                                        ) : (
                                            <p>{item.comments}</p> // Display "No comments yet" if it's a string
                                        )}
                                        {/* Comment submission form */}
                                        <Form onSubmit={(e) => handleCommentSubmit(e, item.ItemID)}>
                                            <Form.Group controlId={`comment-${item.ItemID}`}>
                                                <Form.Label>New Comment</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={newComment[item.ItemID] || ""}
                                                    onChange={(e) => handleCommentChange(e, item.ItemID)}
                                                    placeholder="Add a comment"
                                                />
                                            </Form.Group>
                                            <Button type="submit" className="mt-2">Submit</Button>
                                        </Form>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
}
