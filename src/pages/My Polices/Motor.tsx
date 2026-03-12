import { useState, useRef } from 'react';
import { 
  Button, Modal, Group, Title, Table, Badge, Paper, ActionIcon, 
  Drawer, Text, Grid, Divider, Stack, TextInput, MultiSelect, 
  Select, Collapse, Box, Flex 
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DatePickerInput } from '@mantine/dates';
import { 
  IconEye, IconSearch, IconFilter, IconPlus, IconUpload, 
  IconDatabase, IconBolt, IconFileSpreadsheet 
} from '@tabler/icons-react';
import VehicleDetailsMantine from '../../components/VehicleDetailsForm';

interface DummyPolicy {
  id: number;
  regNo: string;
  category: string;
  make: string;
  model: string;
  insurer: string;
  policyNo: string;
  expiry: string;
  premium: string;
  status: string;
  insuredName: string;
  mobileNumber: string;
  policyType: string;
  paymentMode: string;
  brokerAgency: string;
  subAgent: string;
  totalReceivable: string;
  totalPayable: string;
}

const dummyPolicies: DummyPolicy[] = [
  {
    id: 1,
    regNo: 'AP02NEWW',
    category: 'Private Car',
    make: 'Hyundai',
    model: 'Creta',
    insurer: 'HDFC Ergo',
    policyNo: 'POL-1928374',
    expiry: '03/11/2027',
    premium: '15,000.00',
    status: 'Online',
    insuredName: 'Rahul Kumar',
    mobileNumber: '9876543210',
    policyType: 'Comprehensive',
    paymentMode: 'Online',
    brokerAgency: 'Broker 1',
    subAgent: 'Sub Agent 1',
    totalReceivable: '1500.00',
    totalPayable: '1200.00'
  },
  {
    id: 2,
    regNo: 'KA01AB1234',
    category: 'Two Wheeler',
    make: 'Honda',
    model: 'Activa 6G',
    insurer: 'ICICI Lombard',
    policyNo: 'POL-9182736',
    expiry: '10/25/2026',
    premium: '1,200.00',
    status: 'Cash',
    insuredName: 'Sneha Patil',
    mobileNumber: '9988776655',
    policyType: 'Third Party',
    paymentMode: 'Cash',
    brokerAgency: 'Broker 2',
    subAgent: '-',
    totalReceivable: '120.00',
    totalPayable: '100.00'
  },
  {
    id: 3,
    regNo: 'MH02XY9999',
    category: 'Goods Carrier',
    make: 'Tata',
    model: 'Ace Gold',
    insurer: 'TATA AIG',
    policyNo: 'POL-5566778',
    expiry: '01/15/2027',
    premium: '25,400.00',
    status: 'Cheque',
    insuredName: 'Ajay Singh',
    mobileNumber: '9123456789',
    policyType: 'Comprehensive',
    paymentMode: 'Cheque',
    brokerAgency: 'Broker 1',
    subAgent: 'Sub Agent 2',
    totalReceivable: '4500.00',
    totalPayable: '3800.00'
  }
];

export const Motor = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [uploadOpened, { open: openUpload, close: closeUpload }] = useDisclosure(false);
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewOpened, { open: openPreview, close: closePreview }] = useDisclosure(false);
  const [filterOpened, { toggle: toggleFilter }] = useDisclosure(false);
  const [selectedPolicy, setSelectedPolicy] = useState<DummyPolicy | null>(null);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [stages, setStages] = useState<string[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [vehicleCategory, setVehicleCategory] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [policyEndDateFrom, setPolicyEndDateFrom] = useState<Date | null>(null);
  const [policyEndDateTo, setPolicyEndDateTo] = useState<Date | null>(null);
  const [brokerAgencies, setBrokerAgencies] = useState<string[]>([]);
  const [subAgents, setSubAgents] = useState<string[]>([]);
  const [insurers, setInsurers] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  const handlePreview = (policy: DummyPolicy) => {
    setSelectedPolicy(policy);
    openPreview();
  };

  const filteredPolicies = dummyPolicies.filter((policy) => {
    const matchesSearch = 
      policy.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.insuredName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.policyNo.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesVehicleCategory = !vehicleCategory || policy.category === vehicleCategory;
    const matchesStatus = !status || policy.status === status;
    const matchesInsurers = insurers.length === 0 || insurers.includes(policy.insurer);
    const matchesBroker = brokerAgencies.length === 0 || brokerAgencies.includes(policy.brokerAgency);
    const matchesSubAgent = subAgents.length === 0 || subAgents.includes(policy.subAgent);

    // Simple date string filtering or full date comparison can be added here
    
    return matchesSearch && matchesVehicleCategory && matchesStatus && matchesInsurers && matchesBroker && matchesSubAgent;
  });

  const rows = filteredPolicies.map((policy) => (
    <Table.Tr key={policy.id}>
      <Table.Td fw={500}>{policy.regNo}</Table.Td>
      <Table.Td>{policy.insuredName}</Table.Td>
      <Table.Td>{policy.category}</Table.Td>
      <Table.Td>{policy.make} {policy.model}</Table.Td>
      <Table.Td>{policy.insurer}</Table.Td>
      <Table.Td>{policy.policyNo}</Table.Td>
      <Table.Td>{policy.expiry}</Table.Td>
      <Table.Td>₹{policy.premium}</Table.Td>
      <Table.Td>
        <Badge color={policy.status === 'Online' ? 'green' : policy.status === 'Cash' ? 'blue' : 'orange'} variant="dot">
          {policy.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <ActionIcon variant="light" color="blue" onClick={() => handlePreview(policy)} title="Quick Preview">
            <IconEye size="1.1rem" />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box p="md">
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb="lg" wrap="wrap" gap="md">
        <Title order={3} c="blue.6" style={{ letterSpacing: '0.5px' }}>MOTOR POLICIES</Title>
        
        <Group gap="xs">
          <TextInput 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            style={{ width: 300 }}
          />
          <Button leftSection={<IconSearch size={16} />} variant="filled">Search</Button>
        </Group>

        <Group gap="xs">
          <Button leftSection={<IconFilter size={16} />} color="green.8" onClick={toggleFilter}>Filter</Button>
          <Button leftSection={<IconPlus size={16} />} color="green.8" onClick={open}>Add New</Button>
          <Button leftSection={<IconUpload size={16} />} color="green.8" onClick={openUpload}>Upload Pdf</Button>
          <Button leftSection={<IconUpload size={16} />} color="green.8" onClick={openUpload}>Upload Pdf 2.0</Button>
          <Button leftSection={<IconDatabase size={16} />} color="orange.6">Bulk</Button>
          <Button leftSection={<IconBolt size={16} />} color="blue.7">Add Quick Motor Policy</Button>
          <Button leftSection={<IconFileSpreadsheet size={16} />} color="blue.7">Create Sheet</Button>
        </Group>
      </Flex>

      {/* Filter Panel */}
      <Collapse in={filterOpened}>
        <Paper withBorder p="md" radius="md" mb="xl" bg="gray.0">
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 3 }}>
              <MultiSelect
                label="Select Stage"
                placeholder="All Stages"
                data={['Stage 1', 'Stage 2']}
                value={stages}
                onChange={setStages}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <MultiSelect
                label="Select Group"
                placeholder="All Groups"
                data={['Group 1', 'Group 2']}
                value={groups}
                onChange={setGroups}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                label="Vehicle Category"
                placeholder="Select Category"
                data={['Private Car', 'Two Wheeler', 'Goods Carrier']}
                value={vehicleCategory}
                onChange={setVehicleCategory}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <DatePickerInput
                label="Date From"
                placeholder="mm/dd/yyyy"
                value={dateFrom}
                onChange={(val) => setDateFrom(val as unknown as Date | null)}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <DatePickerInput
                label="Date To"
                placeholder="mm/dd/yyyy"
                value={dateTo}
                onChange={(val) => setDateTo(val as unknown as Date | null)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <DatePickerInput
                label="Policy End Date From"
                placeholder="mm/dd/yyyy"
                value={policyEndDateFrom}
                onChange={(val) => setPolicyEndDateFrom(val as unknown as Date | null)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <DatePickerInput
                label="Policy End Date To"
                placeholder="mm/dd/yyyy"
                value={policyEndDateTo}
                onChange={(val) => setPolicyEndDateTo(val as unknown as Date | null)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <MultiSelect
                label="Select Broker / Agency"
                placeholder="All Broker / Agency"
                data={['Broker 1', 'Broker 2']}
                value={brokerAgencies}
                onChange={setBrokerAgencies}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <MultiSelect
                label="Select Sub Agent"
                placeholder="All Sub Agent"
                data={['Sub Agent 1', 'Sub Agent 2']}
                value={subAgents}
                onChange={setSubAgents}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <MultiSelect
                label="Select Insurer"
                placeholder="All Insurer"
                data={['HDFC Ergo', 'ICICI Lombard', 'TATA AIG']}
                value={insurers}
                onChange={setInsurers}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                label="Status"
                placeholder="Select Policy Status"
                data={['Online', 'Cash', 'Cheque']}
                value={status}
                onChange={setStatus}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }} display="flex" style={{ alignItems: 'flex-end' }}>
              <Button fullWidth>Search</Button>
            </Grid.Col>
          </Grid>
        </Paper>
      </Collapse>

      <Modal opened={opened} onClose={close} title="Add Motor Policy" size="68%">
        <VehicleDetailsMantine />
      </Modal>

      <Modal 
        opened={uploadOpened} 
        onClose={closeUpload} 
        title={<Text fw={700} size="lg">Upload Policy PDF</Text>}
        centered
        radius="md"
        size="md"
      >
        <Stack gap="md" p="md">
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".pdf"
            onChange={(e) => setUploadFileName(e.target.files?.[0]?.name ?? null)}
          />
          <Paper 
            withBorder 
            p="xl" 
            radius="md" 
            style={{ 
              borderStyle: 'dashed', 
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: '#f8f9fa'
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <IconUpload size={48} color="#1c7ed6" stroke={1.5} style={{ marginBottom: '10px' }} />
            <Text size="sm" fw={500}>
              {uploadFileName ? uploadFileName : 'Select PDF File or Drag & Drop'}
            </Text>
            <Text size="xs" color="dimmed">Supported format: .pdf (Max 5MB)</Text>
          </Paper>
          
          <Group justify="flex-end">
            <Button variant="light" color="gray" onClick={closeUpload}>Cancel</Button>
            <Button color="blue">Upload &amp; Process</Button>
          </Group>
        </Stack>
      </Modal>

      <Paper withBorder shadow="md" radius="md" p="md" mt="20px">
        <Table horizontalSpacing="md" verticalSpacing="md" striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead bg="gray.1">
            <Table.Tr>
              <Table.Th>Reg. No.</Table.Th>
              <Table.Th>Insured Name</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Vehicle Info</Table.Th>
              <Table.Th>Insurer</Table.Th>
              <Table.Th>Policy Number</Table.Th>
              <Table.Th>Expiry Date</Table.Th>
              <Table.Th>Premium</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>

      <Drawer
        opened={previewOpened}
        onClose={closePreview}
        title={<Text fw={700} size="lg" color="#1c7ed6">Policy Detailed Preview</Text>}
        position="right"
        size="lg"
        padding="xl"
      >
          {selectedPolicy && (
              <Stack gap="lg">
                  <Paper withBorder p="sm" radius="md" bg="gray.0">
                      <Group justify="space-between">
                          <Text fw={600} size="sm" color="dimmed">Registration No.</Text>
                          <Badge size="xl" radius="sm" variant="filled" color="blue">{selectedPolicy.regNo}</Badge>
                      </Group>
                  </Paper>

                  {/* Vehicle & Policy Details */}
                  <Paper withBorder p="md" radius="md" shadow="xs">
                    <Text size="sm" fw={600} color="#343a40" mb="sm">Vehicle & Policy Information</Text>
                    <Divider mb="sm" />
                    <Grid gutter="sm">
                        <Grid.Col span={6}>
                            <Text size="xs" color="dimmed" fw={500}>Vehicle Category</Text>
                            <Text size="sm" fw={600}>{selectedPolicy.category}</Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Text size="xs" color="dimmed" fw={500}>Make & Model</Text>
                            <Text size="sm" fw={600}>{selectedPolicy.make} {selectedPolicy.model}</Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Text size="xs" color="dimmed" fw={500}>Insurer Name</Text>
                            <Text size="sm" fw={600}>{selectedPolicy.insurer}</Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Text size="xs" color="dimmed" fw={500}>Policy Type</Text>
                            <Text size="sm" fw={600}>{selectedPolicy.policyType}</Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Text size="xs" color="dimmed" fw={500}>Policy Number</Text>
                            <Text size="sm" fw={600}>{selectedPolicy.policyNo}</Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Text size="xs" color="dimmed" fw={500}>Expiry Date</Text>
                            <Text size="sm" fw={600}>{selectedPolicy.expiry}</Text>
                        </Grid.Col>
                    </Grid>
                  </Paper>

                  {/* Insured Details */}
                  <Paper withBorder p="md" radius="md" shadow="xs">
                    <Text size="sm" fw={600} color="#343a40" mb="sm">Insured Profile</Text>
                    <Divider mb="sm" />
                    <Grid gutter="sm">
                        <Grid.Col span={6}>
                            <Text size="xs" color="dimmed" fw={500}>Full Name</Text>
                            <Text size="sm" fw={600}>{selectedPolicy.insuredName}</Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Text size="xs" color="dimmed" fw={500}>Mobile Number</Text>
                            <Text size="sm" fw={600}>{selectedPolicy.mobileNumber}</Text>
                        </Grid.Col>
                    </Grid>
                  </Paper>

                  {/* Commission Details */}
                  <Paper withBorder p="md" radius="md" shadow="xs">
                    <Text size="sm" fw={600} color="#343a40" mb="sm">Commission Handling</Text>
                    <Divider mb="sm" />
                    <Grid gutter="sm">
                        <Grid.Col span={6}>
                            <Text size="xs" color="dimmed" fw={500}>Broker / Agency</Text>
                            <Text size="sm" fw={600}>{selectedPolicy.brokerAgency}</Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Text size="xs" color="dimmed" fw={500}>Sub Agent</Text>
                            <Text size="sm" fw={600}>{selectedPolicy.subAgent}</Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Text size="xs" color="dimmed" fw={500}>Total Receivable</Text>
                            <Text size="sm" fw={600} color="green">₹{selectedPolicy.totalReceivable}</Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Text size="xs" color="dimmed" fw={500}>Total Payable</Text>
                            <Text size="sm" fw={600} color="orange">₹{selectedPolicy.totalPayable}</Text>
                        </Grid.Col>
                    </Grid>
                  </Paper>

                  {/* Premium & Payment */}
                  <Paper withBorder p="md" radius="md" shadow="xs" style={{ borderLeft: '4px solid #1c7ed6' }}>
                      <Group justify="space-between" align="flex-start">
                          <div>
                            <Text size="sm" color="dimmed" fw={500} mb="xs">Total Premium</Text>
                            <Text size="xl" fw={700} color="#1c7ed6">₹{selectedPolicy.premium}</Text>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <Text size="sm" color="dimmed" fw={500} mb="xs">Payment Mode</Text>
                            <Badge color={selectedPolicy.paymentMode === 'Online' ? 'green' : selectedPolicy.paymentMode === 'Cash' ? 'blue' : 'orange'} variant="filled" size="md">
                                {selectedPolicy.paymentMode}
                            </Badge>
                          </div>
                      </Group>
                  </Paper>
              </Stack>
          )}
      </Drawer>
    </Box>
  );
}
