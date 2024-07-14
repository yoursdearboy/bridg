import { DatePicker, Portal } from "@ark-ui/react";
import { Box, Flex, Input, InputGroup, InputRightElement, Table, Td } from "@chakra-ui/react";

export default function DateInput({ locale = "en", value, onChange }) {
  return (
    <DatePicker.Root
      locale={locale}
      value={value ? [value] : []}
      onValueChange={(d) => {
        onChange(d.valueAsString[0] || "");
      }}
    >
      <DatePicker.Control asChild>
        <InputGroup w="200px">
          <DatePicker.Input asChild>
            <Input />
          </DatePicker.Input>
          <InputRightElement w="auto" px="1">
            <DatePicker.ClearTrigger asChild>
              <Box className="fa-solid fa-xmark" px="1" />
            </DatePicker.ClearTrigger>
            <DatePicker.Trigger asChild>
              <Box className="fa-regular fa-calendar" px="1" />
            </DatePicker.Trigger>
          </InputRightElement>
        </InputGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content asChild>
            <Box bg="gray.700" border="1px" borderColor="gray.600" borderRadius="md" p="3">
              <DatePicker.YearSelect></DatePicker.YearSelect>
              <DatePicker.MonthSelect></DatePicker.MonthSelect>
              <DatePicker.View view="day">
                <DatePicker.Context>
                  {(datePicker) => (
                    <>
                      <DatePicker.ViewControl asChild>
                        <Flex>
                          <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                          <DatePicker.ViewTrigger asChild>
                            <Box flex="1" textAlign="center">
                              <DatePicker.RangeText />
                            </Box>
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                        </Flex>
                      </DatePicker.ViewControl>
                      <DatePicker.Table asChild>
                        <Table size="sm">
                          <DatePicker.TableHead>
                            <DatePicker.TableRow>
                              {datePicker.weekDays.map((weekDay, id) => (
                                <DatePicker.TableHeader key={id}>
                                  {weekDay.short}
                                </DatePicker.TableHeader>
                              ))}
                            </DatePicker.TableRow>
                          </DatePicker.TableHead>
                          <DatePicker.TableBody>
                            {datePicker.weeks.map((week, id) => (
                              <DatePicker.TableRow key={id}>
                                {week.map((day, id) => (
                                  <DatePicker.TableCell key={id} value={day} asChild>
                                    <Td p="2">
                                      <DatePicker.TableCellTrigger>
                                        {day.day}
                                      </DatePicker.TableCellTrigger>
                                    </Td>
                                  </DatePicker.TableCell>
                                ))}
                              </DatePicker.TableRow>
                            ))}
                          </DatePicker.TableBody>
                        </Table>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
              <DatePicker.View view="month">
                <DatePicker.Context>
                  {(datePicker) => (
                    <>
                      <DatePicker.ViewControl>
                        <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                        <DatePicker.ViewTrigger>
                          <DatePicker.RangeText />
                        </DatePicker.ViewTrigger>
                        <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                      </DatePicker.ViewControl>
                      <DatePicker.Table>
                        <DatePicker.TableBody>
                          {datePicker
                            .getMonthsGrid({ columns: 4, format: "short" })
                            .map((months, id) => (
                              <DatePicker.TableRow key={id}>
                                {months.map((month, id) => (
                                  <DatePicker.TableCell key={id} value={month.value}>
                                    <DatePicker.TableCellTrigger>
                                      {month.label}
                                    </DatePicker.TableCellTrigger>
                                  </DatePicker.TableCell>
                                ))}
                              </DatePicker.TableRow>
                            ))}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
              <DatePicker.View view="year">
                <DatePicker.Context>
                  {(datePicker) => (
                    <>
                      <DatePicker.ViewControl>
                        <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                        <DatePicker.ViewTrigger>
                          <DatePicker.RangeText />
                        </DatePicker.ViewTrigger>
                        <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                      </DatePicker.ViewControl>
                      <DatePicker.Table>
                        <DatePicker.TableBody>
                          {datePicker.getYearsGrid({ columns: 4 }).map((years, id) => (
                            <DatePicker.TableRow key={id}>
                              {years.map((year, id) => (
                                <DatePicker.TableCell key={id} value={year.value}>
                                  <DatePicker.TableCellTrigger>
                                    {year.label}
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
            </Box>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  );
}
