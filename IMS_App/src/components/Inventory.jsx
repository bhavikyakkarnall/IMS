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

    // Display Items
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
                                        <div className='p-2'><b>Company: </b>{item.company}</div>
                                        <div className='p-2'><b>Tech: </b>{item.tech}</div>
                                    </Stack>
                                </div>

                                <div>
                                    <Stack direction='horizontal' gap={3} className="justify-content-center">
                                        <div className='p-2'><b>Phone# </b>{item.phone}</div>
                                        <div className='p-2'><b>SIM# </b>{item.sim}</div>
                                        <div className='p-2'><b>PO# </b>{item.po}</div>
                                    </Stack>
                                </div>
                                <div>
                                    <Stack direction='horizontal' gap={2} className="justify-content-center">
                                        <div className='p-2'><b>Config: </b>{item.config}</div>
                                        <div className='p-2'><b>Firmware: </b>{item.firmware}</div>
                                        <div className='p-2'><b>Status: </b>{item.status}</div>
                                    </Stack>
                                </div>
                            </Card.Text>
                        </Card.Body>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0xs">
                                <Accordion.Header>Comments</Accordion.Header>
                                <Accordion.Body>
                                    <h6 style={{display: 'flex', justifyContent: 'left'}}>User 1</h6>
                                    <p style={{display: 'flex', justifyContent: 'left'}}>Tech tried to install unit in mulitple sites, but the unit not able to send signals. Advised return to ADT.</p>

                                    <h6 style={{display: 'flex', justifyContent: 'left'}}>Refurb technician</h6>
                                    <p style={{display: 'flex', justifyContent: 'left'}}>Medical unit returned.</p>
                                    
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
