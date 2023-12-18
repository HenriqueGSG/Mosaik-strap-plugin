import React, { useState } from "react";
import { Brush, Puzzle } from "@strapi/icons";
import {
  Badge,
  Box,
  Button,
  DatePicker,
  Flex,
  JSONInput,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
  Typography,
} from "@strapi/design-system";

const ProdModal = ({ preProdRule, handleUpdateRule, prodRulesId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState();
  return (
    <>
      <Box>
        <Button onClick={() => setIsVisible((prev) => !prev)}>Atualizar</Button>
      </Box>

      {isVisible && (
        <ModalLayout
          onClose={() => setIsVisible((prev) => !prev)}
          labelledBy="title"
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Atualizar regra em PRODUÇÃO
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Flex
              direction="column"
              alignItems="flex-start"
              display="inline"
              gap={4}
            >
              <Flex
                paddingBottom={3}
                direction="column"
                alignItems="flex-start"
                gap={2}
              >
                <Badge
                  active={true}
                  children={preProdRule["attributes"]["name"]}
                ></Badge>
                <Typography paddingTop={2} variant="alpha">
                  Deseja realmente atualizar?
                </Typography>
              </Flex>
              <JSONInput
                value={JSON.stringify(
                  preProdRule["attributes"]["rule"],
                  null,
                  2
                )}
              ></JSONInput>
            </Flex>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button
                onClick={() => setIsVisible((prev) => !prev)}
                variant="tertiary"
              >
                Cancel
              </Button>
            }
            endActions={
              <>
                <Button
                  variant="success"
                  // onClick={() => handleUpdateRule()}

                  onClick={() => {
                    handleUpdateRule(), setIsVisible((prev) => !prev);
                  }}
                >
                  Sim
                </Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default ProdModal;
