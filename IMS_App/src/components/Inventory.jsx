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
    const fetchComments = (cs) => {
        dataService.getComments(cs)
            .then(commentsData => {
                setComments(prevComments => ({
                    ...prevComments,
                    [cs]: commentsData  // Store comments keyed by CS
                }));
            })
            .catch(error => {
                console.log("Error fetching comments:", error);
            });
    }

    // Display Items with Comments
    let itemsListJsx = items.map(item => {
        return (
            <>
                <div key={item.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card style={{ width: '75%', margin: '10px', textAlign: 'center' }} >
                        <Card.Body>
                            <Card.Title><h5>CS: {item.cs}</h5></Card.Title>
                            <Card.Text>
                                <div>
                                    <Stack direction='horizontal' gap={3} className="justify-content-center">
                                        <div className='p-2'><b>Serial# </b>{item.serial}</div>
                                        <div className='p-2'><b>Location: </b>{item.location}</div>
                                        <div className='p-2'><b>Status: </b>{item.status}</div>
                                    </Stack>
                                </div>

                                <div>
                                    <Stack direction='horizontal' gap={3} className="justify-content-center">
                                        <div className='p-2'><b>Phone# </b>{item.phoneNumber}</div>
                                        <div className='p-2'><b>SIM# </b>{item.simNumber}</div>
                                        <div className='p-2'><b>PO# </b>{item.po}</div>
                                    </Stack>
                                </div>
                            </Card.Text>
                        </Card.Body>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0xs">
                                <Accordion.Header onClick={() => fetchComments(item.cs)}>Comments</Accordion.Header>
                                <Accordion.Body>
                                    {comments[item.cs] ? (
                                        comments[item.cs].map((comment, index) => (
                                            <div key={index}>
                                                <h6 style={{ display: 'flex', justifyContent: 'left' }}>{comment.user}</h6>
                                                <p style={{ display: 'flex', justifyContent: 'left' }}>{comment.text}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No comments yet</p>
                                    )}
                                    <Stack direction='horizontal' gap={2} className="justify-content-center">
                                        <Form.Control className='p-2' placeholder="Comment" />
                                        <Button className='p-2' variant="primary">Add</Button>
                                        <Button className='p-2' variant="primary">Edit</Button>
                                    </Stack>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card>
                </div>
            </>
        )
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
