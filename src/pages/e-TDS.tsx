import { useState, useRef } from 'react';
import {
  Box, Button, Flex, Modal, Text, Title, Paper,
  Table, Badge, ActionIcon, TextInput, Group, Stack,
  Drawer, Grid, Divider
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconPlus, IconEye, IconSearch, IconFilter,
  IconUpload, IconFileSpreadsheet
} from '@tabler/icons-react';
import { ETDSFilingForm } from '../components/ETDSFilingForm';

interface ETDSRecord {
  id: number;
  tanNumber: string;
  deducteePan: string;
  formType: string;
  quarter: string;
  financialYear: string;
  tdsAmount: string;
  status: string;
}

const initialData: ETDSRecord[] = [
  {
    id: 1,
    tanNumber: 'KOLM12345P',
    deducteePan: 'ABCDE1234F',
    formType: '26Q',
    quarter: 'Q4',
    financialYear: '2024-25',
    tdsAmount: '₹18,500',
    status: 'Filed',
  },
  {
    id: 2,
    tanNumber: 'MUMS98765R',
    deducteePan: 'FGHIJ5678K',
    formType: '24Q',
    quarter: 'Q3',
    financialYear: '2024-25',
    tdsAmount: '₹32,000',
    status: 'Pending',
  },
  {
    id: 3,
    tanNumber: 'DELL45612T',
    deducteePan: 'LMNOP9012L',
    formType: '27Q',
    quarter: 'Q2',
    financialYear: '2025-26',
    tdsAmount: '₹9,750',
    status: 'Processed',
  },
];

export const ETDSPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [uploadOpened, { open: openUpload, close: closeUpload }] = useDisclosure(false);
  const [previewOpened, { open: openPreview, close: closePreview }] = useDisclosure(false);
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [records, setRecords] = useState<ETDSRecord[]>(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<ETDSRecord | null>(null);

  const handlePreview = (record: ETDSRecord) => {
    setSelectedRecord(record);
    openPreview();
  };

  const handleFormSubmit = (values: {
    tanNumber: string; deducteePan: string; formType: string;
    quarter: string; financialYear: string; tdsAmount: number;
  }) => {
    const newRecord: ETDSRecord = {
      id: records.length + 1,
      tanNumber: values.tanNumber || '—',
      deducteePan: values.deducteePan || '—',
      formType: values.formType || '26Q',
      quarter: values.quarter || 'Q4',
      financialYear: values.financialYear || '2025-26',
      tdsAmount: values.tdsAmount ? `₹${values.tdsAmount.toLocaleString()}` : '₹0',
      status: 'Pending',
    };
    setRecords((prev) => [newRecord, ...prev]);
    close();
  };

  const filtered = records.filter((r) =>
    r.tanNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.deducteePan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.formType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColor = (s: string) =>
    s === 'Filed' ? 'blue' : s === 'Processed' ? 'green' : 'orange';

  return (
    <Box p="md">
      {/* Header */}
      <Flex justify="space-between" align="flex-start" mb="lg" wrap="wrap" gap="md">
        {/* Left: Title + Buttons */}
        <Box>
          <Title order={3} c="blue.6" style={{ letterSpacing: '0.5px' }} mb="xs">e-TDS</Title>
          <Group gap="xs">
            <Button leftSection={<IconFilter size={16} />} color="green.8">Filter</Button>
            <Button leftSection={<IconPlus size={16} />} color="green.8" onClick={open}>Add New</Button>
            <Button leftSection={<IconUpload size={16} />} color="green.8" onClick={openUpload}>Upload</Button>
            <Button leftSection={<IconFileSpreadsheet size={16} />} color="blue.7">Create Sheet</Button>
          </Group>
        </Box>

        {/* Right: Search */}
        <Group gap="xs" align="flex-end">
          <TextInput
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            style={{ width: 260 }}
          />
          <Button leftSection={<IconSearch size={16} />} variant="filled">Search</Button>
        </Group>
      </Flex>

      {/* Table */}
      <Paper withBorder shadow="md" radius="md" p="md" mt="20px">
        <Table horizontalSpacing="md" verticalSpacing="md" striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead bg="gray.1">
            <Table.Tr>
              <Table.Th>TAN No.</Table.Th>
              <Table.Th>Deductee PAN</Table.Th>
              <Table.Th>Form Type</Table.Th>
              <Table.Th>Quarter</Table.Th>
              <Table.Th>Financial Year</Table.Th>
              <Table.Th>TDS Amount</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filtered.map((r) => (
              <Table.Tr key={r.id}>
                <Table.Td fw={500}>{r.tanNumber}</Table.Td>
                <Table.Td>{r.deducteePan}</Table.Td>
                <Table.Td>{r.formType}</Table.Td>
                <Table.Td>{r.quarter}</Table.Td>
                <Table.Td>{r.financialYear}</Table.Td>
                <Table.Td>{r.tdsAmount}</Table.Td>
                <Table.Td>
                  <Badge color={statusColor(r.status)} variant="dot">{r.status}</Badge>
                </Table.Td>
                <Table.Td>
                  <ActionIcon variant="light" color="blue" title="Quick Preview" onClick={() => handlePreview(r)}>
                    <IconEye size="1.1rem" />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>

      {/* Upload Modal */}
      <Modal
        opened={uploadOpened}
        onClose={closeUpload}
        title={<Text fw={700} size="lg">Upload File</Text>}
        centered
        radius="md"
        size="md"
      >
        <Stack gap="md" p="md">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".pdf,.xlsx,.csv"
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
              {uploadFileName ? uploadFileName : 'Select File or Drag & Drop'}
            </Text>
            <Text size="xs" c="dimmed">Supported: .pdf, .xlsx, .csv (Max 5MB)</Text>
          </Paper>
          <Group justify="flex-end">
            <Button variant="light" color="gray" onClick={closeUpload}>Cancel</Button>
            <Button color="blue">Upload &amp; Process</Button>
          </Group>
        </Stack>
      </Modal>

      {/* Add New Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={<Text fw={700} size="lg">e-TDS Return Entry</Text>}
        size="xl"
        centered
      >
        <ETDSFilingForm onSubmitSuccess={handleFormSubmit} />
      </Modal>

      {/* Quick Preview Drawer */}
      <Drawer
        opened={previewOpened}
        onClose={closePreview}
        title={<Text fw={700} size="lg" c="blue.7">e-TDS Record Preview</Text>}
        position="right"
        size="lg"
        padding="xl"
      >
        {selectedRecord && (
          <Stack gap="lg">
            {/* TAN Badge Header */}
            <Paper withBorder p="sm" radius="md" bg="gray.0">
              <Group justify="space-between">
                <Text fw={600} size="sm" c="dimmed">TAN Number</Text>
                <Badge size="xl" radius="sm" variant="filled" color="blue">{selectedRecord.tanNumber}</Badge>
              </Group>
            </Paper>

            {/* Filing Information */}
            <Paper withBorder p="md" radius="md" shadow="xs">
              <Text size="sm" fw={600} c="#343a40" mb="sm">Filing Information</Text>
              <Divider mb="sm" />
              <Grid gutter="sm">
                <Grid.Col span={6}>
                  <Text size="xs" c="dimmed" fw={500}>Form Type</Text>
                  <Text size="sm" fw={600}>{selectedRecord.formType}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="xs" c="dimmed" fw={500}>Quarter</Text>
                  <Text size="sm" fw={600}>{selectedRecord.quarter}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="xs" c="dimmed" fw={500}>Financial Year</Text>
                  <Text size="sm" fw={600}>{selectedRecord.financialYear}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="xs" c="dimmed" fw={500}>Deductee PAN</Text>
                  <Text size="sm" fw={600}>{selectedRecord.deducteePan}</Text>
                </Grid.Col>
              </Grid>
            </Paper>

            {/* TDS Amount & Status */}
            <Paper withBorder p="md" radius="md" shadow="xs" style={{ borderLeft: '4px solid #1c7ed6' }}>
              <Group justify="space-between" align="flex-start">
                <div>
                  <Text size="sm" c="dimmed" fw={500} mb="xs">TDS Amount</Text>
                  <Text size="xl" fw={700} c="blue.7">{selectedRecord.tdsAmount}</Text>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Text size="sm" c="dimmed" fw={500} mb="xs">Filing Status</Text>
                  <Badge color={statusColor(selectedRecord.status)} variant="filled" size="md">
                    {selectedRecord.status}
                  </Badge>
                </div>
              </Group>
            </Paper>
          </Stack>
        )}
      </Drawer>
    </Box>
  );
};
