import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { createClientMng, updateClientMng, deleteClientMng } from './graphql/mutations';
import { listClientMngs } from './graphql/queries';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

function App() {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientList, setShowClientList] = useState(true); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { target } = e;

    const input = {
      name: target.name.value,
      phone: target.phone.value,
      address: target.address.value,
      projectType: target.projectType.value,
      email: target.email.value,
      visitDate: target.visitDate.value,
      estimate: parseFloat(target.estimate.value) || null,
      clientSource: target.clientSource.value,
      reference: target.reference.value,
      inspector: target.inspector.value,
      inspectionDate: target.inspectionDate.value || null,
      hasBusinessEngaged: target.hasBusinessEngaged.value || null,
      remark: target.remark.value,
    };

    try {
      if (selectedClient) {
        await client.graphql({
          query: updateClientMng,
          variables: { input: { id: selectedClient.id, ...input } },
        });
        alert('Client updated successfully');
      } else {
        await client.graphql({
          query: createClientMng,
          variables: { input },
        });
        alert('Client added successfully');
      }

      target.reset();
      setSelectedClient(null);
      fetchClients();
    } catch (error) {
      console.error('Error processing client:', error);
      alert('Error processing client, please try again');
    }
  };

  const fetchClients = async () => {
    try {
      const apiData = await client.graphql({
        query: listClientMngs,
      });

      if (apiData && apiData.data && apiData.data.listClientMngs) {
        setClients(apiData.data.listClientMngs.items);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredClients = clients.filter(client => {
    return Object.values(client).some(value =>
      value !== null && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setSearchQuery('');
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await client.graphql({
          query: deleteClientMng,
          variables: { input: { id } },
        });
        alert('Client deleted successfully');
        fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Error deleting client, please try again');
      }
    }
  };

  const handleDownload = () => {
    const csvData = filteredClients.map(client => ({
      Name: client.name,
      Phone: client.phone,
      Address: client.address,
      ProjectType: client.projectType,
      Email: client.email,
      VisitDate: client.visitDate,
      Estimate: client.estimate,
      ClientSource: client.clientSource,
      Reference: client.reference,
      Inspector: client.inspector,
      InspectionDate: client.inspectionDate,
      BusinessEngagement: client.hasBusinessEngaged,
      Remarks: client.remark,
    }));

    const csvRows = [
      Object.keys(csvData[0]).join(','), 
      ...csvData.map(row => Object.values(row).join(',')),
    ].join('\n');

    const blob = new Blob([csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'clients.csv');
    a.click();
  };

  const toggleClientList = () => {
    setShowClientList(!showClientList);
  };

  // Helper function to format phone number
const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const phoneNumber = phone.replace(/\D/g, '');
  if (phoneNumber.length === 10) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
  }
  return phone; // Return unformatted if not 10 digits
};

// Helper function to format estimate as USD
const formatEstimate = (estimate) => {
  if (!estimate) return '';
  return `$${parseFloat(estimate).toFixed(2)}`;
};

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="app-container">
      <h1>Client Registration</h1>
      <input
        type="text"
        placeholder="Search by any information"
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
      <form onSubmit={handleSubmit} className="client-form">
        <div className="form-group">
          <label>Name:</label>
          <input placeholder='Enter a name' name='name' required defaultValue={selectedClient?.name || ''} />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input name='phone' placeholder='Enter phone number' required defaultValue={selectedClient?.phone || ''} />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input name='address' placeholder='Enter address' defaultValue={selectedClient?.address || ''} />
        </div>
        <div className="form-group">
          <label>Project Type:</label>
          <input name='projectType' placeholder='Enter project type' required defaultValue={selectedClient?.projectType || ''} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input name='email' type='email' placeholder='Enter email' defaultValue={selectedClient?.email || ''} />
        </div>
        <div className="form-group">
          <label>Visit Date:</label>
          <input name='visitDate' type='date' placeholder='Enter visit date' required defaultValue={selectedClient?.visitDate || ''} />
        </div>
        <div className="form-group">
          <label>Estimate:</label>
          <input name='estimate' placeholder='Enter estimate' defaultValue={selectedClient?.estimate || ''} />
        </div>
        <div className="form-group">
          <label>Client Source:</label>
          <select name='clientSource' required defaultValue={selectedClient?.clientSource || ''}>
            <option value=''>Select Client Source</option>
            <option value='PHONECALL'>Phone Call</option>
            <option value='WALK_IN'>Walk In</option>
            <option value='INTRODUCTION'>Introduction</option>
            <option value='OTHER'>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Reference:</label>
          <input name='reference' placeholder='Enter reference' defaultValue={selectedClient?.reference || ''} />
        </div>
        <div className="form-group">
          <label>Inspector:</label>
          <input name='inspector' placeholder='Enter inspector' defaultValue={selectedClient?.inspector || ''} />
        </div>
        <div className="form-group">
          <label>Inspection Date:</label>
          <input name='inspectionDate' type='date' placeholder='Enter inspection date' defaultValue={selectedClient?.inspectionDate || ''} />
        </div>
        <div className="form-group">
          <label>Business Engagement:</label>
          <select name='hasBusinessEngaged' defaultValue={selectedClient?.hasBusinessEngaged || ''}>
            <option value=''>Select Engagement Status</option>
            <option value='YES'>Yes</option>
            <option value='NO'>No</option>
            <option value='PENDING'>Pending</option>
          </select>
        </div>
        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label>Remarks:</label>
          <textarea name='remark' placeholder='Enter any remarks' defaultValue={selectedClient?.remark || ''} className="full-width-textarea" />
        </div>
        <div className="button-container">
          <button type='submit' className="add-client-button">{selectedClient ? 'Update Client' : 'Add Client'}</button>
        </div>
      </form>
      <button onClick={handleDownload} className="download-button">Download Clients</button>
      <div className="client-list-toggle">
        <h2 className="client-list-title">
          Client List 
          <button onClick={toggleClientList} className="toggle-client-list-button">
            {showClientList ? 'Hide' : 'Show'}
          </button>
        </h2>
      </div>
      {showClientList && (
  <div className="client-list">
    <ul>
      {filteredClients.map((client) => (
        <li key={client.id} className="client-item">
          <div className="client-summary">
            <strong>Name:</strong> {client.name} <br />
            <strong>Phone:</strong> {formatPhoneNumber(client.phone)}<br />
            <strong>Address:</strong> {client.address} <br />
            <strong>Project Type:</strong> {client.projectType} <br />
            <strong>Email:</strong> {client.email} <br />
            <strong>Visit Date:</strong> {client.visitDate} <br />
            <strong>Estimate:</strong> {formatEstimate(client.estimate)}<br />
            <strong>Client Source:</strong> {client.clientSource} <br />
            <strong>Reference:</strong> {client.reference} <br />
            <strong>Inspector:</strong> {client.inspector} <br />
            <strong>Inspection Date:</strong> {client.inspectionDate} <br />
            <strong>Business Engagement:</strong> {client.hasBusinessEngaged} <br />
            <strong>Remarks:</strong> {client.remark} <br />
            <button onClick={() => handleSelectClient(client)} className="edit-button">Edit</button>
            <button onClick={() => handleDeleteClient(client.id)} className="delete-button">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
)}
    </div>
  );
}

export default withAuthenticator(App);
