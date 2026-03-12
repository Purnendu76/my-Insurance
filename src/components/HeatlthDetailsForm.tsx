import React from "react";
import {
  TextInput,
  Select,
  Radio,
  Group,
  Grid,
  Text,
  Container,
  Paper,
  Divider,
  Stack,
  NumberInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

const HealthBasicDetails = () => {
  const form = useForm({
    initialValues: {
      lobCategory: "Health",
      subLobCategory: "Basic Health",
      businessType: "NEW",
      policyType: "Family Floater",
      seniorCitizenPolicy: "No",
      numberOfAdult: 0,
      numberOfChild: 0,
      numberOfParent: 0,
      eldestPersonAgeType: "DOB",
      eldestPersonDOB: null,
      eldestPersonAge: "",
      treatmentZone: "ANY",
      ped: "No",
      prevPolicyAvailable: "No",
    },
  });

  const labelStyle = {
    label: { color: "#1c7ed6", fontWeight: 600, fontSize: "13px" },
  };

  return (
    <Container size="xl" py="xl">
      <Paper withBorder p="md" radius="xs" shadow="sm">
        <Text size="sm" fw={500} color="dimmed" mb="xs">
          Basic Details
        </Text>
        <Divider mb="xl" />

        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Grid gutter="xl">
            {/* Row 1 */}
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                label="LOB Category"
                withAsterisk
                data={["Health", "Motor", "Travel"]}
                {...form.getInputProps("lobCategory")}
                styles={labelStyle}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                label="Sub LOB Category"
                withAsterisk
                data={[
                  "Basic Health",
                  "Top-Up",
                  "Critical",
                  "Personnel Accident",
                  "OPD Plan",
                  "Day Cash",
                ]}
                {...form.getInputProps("subLobCategory")}
                styles={labelStyle}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                label="Business Type"
                withAsterisk
                data={[
                  "NEW",
                  "RENEWAL",
                  "ROLLOVER",
                  "PORT CASE",
                  "MIGRATE CASE",
                ]}
                {...form.getInputProps("businessType")}
                styles={labelStyle}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                label="Policy Type"
                withAsterisk
                data={["Family Floater", "Individual", "Multi-Individual"]}
                {...form.getInputProps("policyType")}
                styles={labelStyle}
              />
            </Grid.Col>

            {/* Row 2 */}
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                label="Senior Citizen Policy"
                data={["No", "Yes"]}
                {...form.getInputProps("seniorCitizenPolicy")}
                styles={labelStyle}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <NumberInput
                label="Number of Adult"
                withAsterisk
                min={0}
                {...form.getInputProps("numberOfAdult")}
                styles={labelStyle}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <NumberInput
                label="Number of Child"
                withAsterisk
                min={0}
                {...form.getInputProps("numberOfChild")}
                styles={labelStyle}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <NumberInput
                label="Number of Parent"
                withAsterisk
                min={0}
                {...form.getInputProps("numberOfParent")}
                styles={labelStyle}
              />
            </Grid.Col>

            {/* Row 3 */}
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Radio.Group
                label="Eledest Person Age Type"
                withAsterisk
                {...form.getInputProps("eldestPersonAgeType")}
                styles={labelStyle}
              >
                <Stack mt="xs" gap="xs">
                  <Radio value="Age" label="Age" size="xs" />
                  <Radio value="DOB" label="DOB" size="xs" />
                </Stack>
              </Radio.Group>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              {form.values.eldestPersonAgeType === "DOB" ? (
                <DateInput
                  label="Eledest Person DOB"
                  placeholder="mm/dd/yyyy"
                  withAsterisk
                  {...form.getInputProps("eldestPersonDOB")}
                  styles={labelStyle}
                />
              ) : (
                <TextInput
                  label="Eledest Person Age"
                  placeholder="Enter Age"
                  withAsterisk
                  {...form.getInputProps("eldestPersonAge")}
                  styles={labelStyle}
                />
              )}
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                label="Treatment Zone"
                withAsterisk
                data={["ANY", "Zone A", "Zone B"]}
                {...form.getInputProps("treatmentZone")}
                styles={labelStyle}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <Radio.Group
                label="PED"
                withAsterisk
                {...form.getInputProps("ped")}
                styles={labelStyle}
              >
                <Stack mt="xs" gap="xs">
                  <Radio value="Yes" label="Yes" size="xs" />
                  <Radio value="No" label="No" size="xs" />
                </Stack>
              </Radio.Group>
            </Grid.Col>

            {/* Row 4 */}
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Radio.Group
                label="Previous Policy Available"
                {...form.getInputProps("prevPolicyAvailable")}
                styles={labelStyle}
              >
                <Stack mt="xs" gap="xs">
                  <Radio value="Yes" label="Yes" size="xs" />
                  <Radio value="No" label="No" size="xs" />
                </Stack>
              </Radio.Group>
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="xl">
            <button
              type="submit"
              style={{
                backgroundColor: "#1c7ed6",
                color: "white",
                border: "none",
                padding: "10px 30px",
                borderRadius: "4px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Next Step
            </button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default HealthBasicDetails;
