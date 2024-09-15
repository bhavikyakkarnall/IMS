import { useState, useEffect } from 'react';
import DataService from '../services/dataService';
import ItemsFilter from './ItemsFilter.jsx';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

const dataService = new DataService('http://localhost:8080');

export default function Inventory() {

    const [allItems, setAllItems] = useState([]);
    const [items, setItems] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [techs, setTechs] = useState([]);
    const [pos, setPOs] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [comments, setComments] = useState({});  // New state to hold comments
    const [loadingComments, setLoadingComments] = useState({});  // To track loading state for comments

    useEffect(() => {
        dataService.getItems()
            .then(itemsJsonData => {
                setItems(itemsJsonData);
                setAllItems(itemsJsonData);
                setCompanies(getUniqueCompanyList(itemsJsonData));
                setStatuses(getUniqueStatusList(itemsJsonData));
                setTechs(getUniqueTechList(itemsJsonData));
                setPOs(getUniquePOList(itemsJsonData));
            })
            .catch(error => {
                setErrorMessage("SERVER DOWN! Unable to connect to server. Please try again later.")
            });
    }, []);

    const getUniqueStatusList = (items) => {
        const allStatusList = items.map(item => item.status);
        return [...new Set(allStatusList)];
    }

    const getUniqueCompanyList = (items) => {
        const allCompanyList = items.map(item => item.company);
        return [...new Set(allCompanyList)];
    }

    const getUniqueTechList = (items) => {
        const allTechList = items.map(item => item.tech);
        return [...new Set(allTechList)];
    }

    const getUniquePOList = (items) => {
        const allPOList = items.map(item => item.po);
        return [...new Set(allPOList)];
    }

    const applyFilter = (cs, status, company, tech, po) => {
        let filteredItems = allItems.filter(item => {
            const csString = item.cs ? item.cs.toString() : '';
            return csString.includes(cs) &&
                item.po.toLowerCase().includes(po.toLowerCase()) &&
                item.tech.toLowerCase().includes(tech.toLowerCase()) &&
                item.status.toLowerCase().includes(status.toLowerCase()) &&
                item.company.toLowerCase().includes(company.toLowerCase());
        });
        setItems(filteredItems);
    }

    const showAllItems = () => {
        setItems(allItems);
    }

    // Fetch comments for an item based on its CS (unique identifier)
    const fetchComments = (ItemID, cs) => {
        setLoadingComments(prevLoading => ({ ...prevLoading, [cs]: true })); // Set loading state for this item
        dataService.getComments(ItemID)
            .then(commentsData => {
                setComments(prevComments => ({
                    ...prevComments,
                    [cs]: commentsData.length > 0 ? commentsData : []  // Ensure an empty array if no comments
                }));
                setLoadingComments(prevLoading => ({ ...prevLoading, [cs]: false }));  // Clear loading state
            })
            .catch(error => {
                console.log("Error fetching comments:", error);
                setLoadingComments(prevLoading => ({ ...prevLoading, [cs]: false }));  // Clear loading state even if there's an error
            });
    };


    // Display Items with Comments
    let itemsListJsx = items.map(item => {
        return (
            <>
                <div key={item.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card style={{ width: '75%', margin: '10px', textAlign: 'center' }} >
                        <Card.Body>
                            <Card.Title><h5>CS: {item.cs}</h5></Card.Title>
                            <Card.Text>
                                <Stack direction='horizontal' gap={3} className="justify-content-center">
                                    <div className='p-2'><b>Serial# </b>{item.serial}</div>
                                    <div className='p-2'><b>Location: </b>{item.location}</div>
                                    <div className='p-2'><b>Status: </b>{item.status}</div>
                                </Stack>
                            </Card.Text>
                        </Card.Body>
                        <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey={item.cs}>
                                <Accordion.Header onClick={() => fetchComments(item.ItemID, item.cs)}>Comments</Accordion.Header>
                                <Accordion.Body>
                                    {loadingComments[item.cs] ? (
                                        <p>Loading comments...</p>
                                    ) : comments[item.cs]?.length > 0 ? (
                                        comments[item.cs].map((comment, index) => (
                                            <div key={index}>
                                                <h6>{comment.user}</h6>
                                                <p>{comment.text}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No comments yet</p>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card>
                </div>
            </>
        );
    });

    return (
        <>
            <ItemsFilter companies={companies} statuses={statuses} techs={techs} pos={pos} onFilterChange={applyFilter}></ItemsFilter>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div>
                {itemsListJsx}
            </div>
        </>
    );
}
