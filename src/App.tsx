import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Modal, Form, Button, Alert } from 'react-bootstrap';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { supabase, isUsingPlaceholder } from './supabaseClient';
import { HourlyData, CallMetrics, CallDurationData } from './types';
import './App.css';

// Initial dummy data
const initialHourlyData: HourlyData[] = [
  { hour: '00:00', calls: 45, duration: 320 },
  { hour: '04:00', calls: 32, duration: 280 },
  { hour: '08:00', calls: 95, duration: 450 },
  { hour: '12:00', calls: 142, duration: 680 },
  { hour: '16:00', calls: 128, duration: 620 },
  { hour: '20:00', calls: 76, duration: 380 },
];

const durationData: CallDurationData[] = [
  { range: '0-2 min', count: 145 },
  { range: '2-5 min', count: 234 },
  { range: '5-10 min', count: 187 },
  { range: '10-15 min', count: 98 },
  { range: '15+ min', count: 54 },
];

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];

function App() {
  const [hourlyData, setHourlyData] = useState<HourlyData[]>(initialHourlyData);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOverwriteModal, setShowOverwriteModal] = useState(false);
  const [email, setEmail] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [editData, setEditData] = useState<HourlyData[]>(initialHourlyData);
  const [existingData, setExistingData] = useState<HourlyData[] | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger' | 'info'; message: string } | null>(null);

  // Calculate metrics from hourly data
  const metrics: CallMetrics = {
    totalCalls: hourlyData.reduce((sum, item) => sum + item.calls, 0),
    successfulCalls: Math.floor(hourlyData.reduce((sum, item) => sum + item.calls, 0) * 0.92),
    failedCalls: Math.floor(hourlyData.reduce((sum, item) => sum + item.calls, 0) * 0.08),
    averageDuration: Math.floor(
      hourlyData.reduce((sum, item) => sum + item.duration, 0) / hourlyData.length
    ),
  };

  const showAlert = useCallback((type: 'success' | 'danger' | 'info', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  }, []);

  const loadUserData = useCallback(async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('call_analytics')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "no rows returned"
        console.error('Error loading user data:', error);
        return;
      }

      if (data && data.hourly_data) {
        setHourlyData(data.hourly_data);
        showAlert('info', 'Your previous data has been loaded!');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, [showAlert]);

  // Check if user email is stored in localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
      loadUserData(storedEmail);
    }
  }, [loadUserData]);

  const handleEditClick = () => {
    if (!userEmail) {
      setShowEmailModal(true);
    } else {
      setEditData(hourlyData);
      setShowEditModal(true);
    }
  };

  const handleEmailSubmit = async () => {
    if (!email || !email.includes('@')) {
      showAlert('danger', 'Please enter a valid email address');
      return;
    }

    setUserEmail(email);
    localStorage.setItem('userEmail', email);
    setShowEmailModal(false);
    
    // Check if user has existing data
    try {
      const { data } = await supabase
        .from('call_analytics')
        .select('*')
        .eq('email', email)
        .single();

      if (data && data.hourly_data) {
        setExistingData(data.hourly_data);
      }
    } catch (error) {
      console.error('Error checking existing data:', error);
    }

    setEditData(hourlyData);
    setShowEditModal(true);
  };

  const handleDataChange = (index: number, field: 'calls' | 'duration', value: string) => {
    const newData = [...editData];
    newData[index] = {
      ...newData[index],
      [field]: parseInt(value) || 0,
    };
    setEditData(newData);
  };

  const handleSaveData = async () => {
    if (!userEmail) return;

    // Check if user has existing data
    try {
      const { data: existingRecord } = await supabase
        .from('call_analytics')
        .select('*')
        .eq('email', userEmail)
        .single();

      if (existingRecord) {
        setExistingData(existingRecord.hourly_data);
        setShowEditModal(false);
        setShowOverwriteModal(true);
        return;
      }

      // No existing data, save directly
      await saveToSupabase();
    } catch (error) {
      console.error('Error checking existing data:', error);
      await saveToSupabase();
    }
  };

  const saveToSupabase = async () => {
    if (!userEmail) return;

    try {
      const { error } = await supabase
        .from('call_analytics')
        .upsert({
          email: userEmail,
          hourly_data: editData,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error saving data:', error);
        showAlert('danger', 'Failed to save data. Please check Supabase setup.');
        return;
      }

      setHourlyData(editData);
      setShowEditModal(false);
      setShowOverwriteModal(false);
      showAlert('success', 'Your data has been saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      showAlert('danger', 'An error occurred while saving data.');
    }
  };

  const handleConfirmOverwrite = async () => {
    await saveToSupabase();
  };

  const handleCancelOverwrite = () => {
    setShowOverwriteModal(false);
    setShowEditModal(true);
  };

  return (
    <div className="App">
      <Container>
        <div className="header">
          <h1>Call Analytics Dashboard</h1>
          <p>Voice Agent Performance Metrics</p>
          {userEmail && <small style={{ color: '#667eea' }}>Logged in as: {userEmail}</small>}
        </div>

        {isUsingPlaceholder && (
          <Alert variant="warning" className="mb-3">
            <strong>📌 Demo Mode:</strong> Supabase is not configured. The app works perfectly, but 
            data won't persist. See <code>SETUP_GUIDE.md</code> to enable data storage.
          </Alert>
        )}

        {alert && (
          <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
            {alert.message}
          </Alert>
        )}

        {/* Metrics Overview */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">{metrics.totalCalls}</div>
            <div className="metric-label">Total Calls</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{metrics.successfulCalls}</div>
            <div className="metric-label">Successful Calls</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{metrics.failedCalls}</div>
            <div className="metric-label">Failed Calls</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{metrics.averageDuration}s</div>
            <div className="metric-label">Avg Duration</div>
          </div>
        </div>

        <Row>
          {/* Hourly Call Volume Chart (Editable) */}
          <Col md={12} className="mb-4">
            <div className="chart-card">
              <h3>📞 Hourly Call Volume & Duration</h3>
              <p>Track call volume and average duration throughout the day</p>
              <Button className="edit-btn mb-3" onClick={handleEditClick}>
                ✏️ Edit Data
              </Button>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="hour" stroke="#a8b2d1" />
                  <YAxis stroke="#a8b2d1" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1f3a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: '#ffffff',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="calls"
                    stroke="#667eea"
                    strokeWidth={3}
                    name="Number of Calls"
                  />
                  <Line
                    type="monotone"
                    dataKey="duration"
                    stroke="#764ba2"
                    strokeWidth={3}
                    name="Avg Duration (s)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Col>

          {/* Call Duration Distribution */}
          <Col md={6} className="mb-4">
            <div className="chart-card">
              <h3>⏱️ Call Duration Distribution</h3>
              <p>Breakdown of calls by duration ranges</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={durationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="range" stroke="#a8b2d1" />
                  <YAxis stroke="#a8b2d1" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1f3a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: '#ffffff',
                    }}
                  />
                  <Bar dataKey="count" fill="#667eea" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>

          {/* Success Rate Pie Chart */}
          <Col md={6} className="mb-4">
            <div className="chart-card">
              <h3>✅ Call Success Rate</h3>
              <p>Distribution of successful vs failed calls</p>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Successful', value: metrics.successfulCalls },
                      { name: 'Failed', value: metrics.failedCalls },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[0, 1].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1f3a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: '#ffffff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Email Modal */}
      <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please provide your email to save custom data:</p>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmailModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEmailSubmit}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Data Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Hourly Call Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Customize the hourly call volume and duration values:</p>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {editData.map((item, index) => (
              <Row key={index} className="mb-3">
                <Col xs={4}>
                  <strong>{item.hour}</strong>
                </Col>
                <Col xs={4}>
                  <Form.Group>
                    <Form.Label>Calls</Form.Label>
                    <Form.Control
                      type="number"
                      value={item.calls}
                      onChange={(e) => handleDataChange(index, 'calls', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group>
                    <Form.Label>Duration (s)</Form.Label>
                    <Form.Control
                      type="number"
                      value={item.duration}
                      onChange={(e) => handleDataChange(index, 'duration', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Overwrite Confirmation Modal */}
      <Modal show={showOverwriteModal} onHide={() => setShowOverwriteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Overwrite Existing Data?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            You have existing data saved for this email. Are you sure you want to overwrite it?
          </Alert>
          {existingData && (
            <div>
              <h6>Previous Values (first 3 entries):</h6>
              <ul>
                {existingData.slice(0, 3).map((item, idx) => (
                  <li key={idx}>
                    {item.hour}: {item.calls} calls, {item.duration}s duration
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelOverwrite}>
            Go Back
          </Button>
          <Button variant="primary" onClick={handleConfirmOverwrite}>
            Yes, Overwrite
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;

