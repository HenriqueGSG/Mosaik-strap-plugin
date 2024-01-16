/**
 *
 * PluginIcon
 *
 */

import React, { useState } from "react";
import {
  ExclamationMarkCircle,
  Lock,
  Plus,
  Trash,
  Upload,
} from "@strapi/icons";
import {
  Box,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Flex,
  Typography,
} from "@strapi/design-system";

const DialogUpdate = ({ handleUpdateRule }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button variant={"success"} onClick={() => setIsVisible(true)}>
        Atualizar
      </Button>
      <Box>
        <Dialog
          id="dialog-update"
          onClose={() => setIsVisible(false)}
          title="Confirmation"
          isOpen={isVisible}
        >
          <DialogBody icon={<ExclamationMarkCircle />}>
            <Flex direction="column" alignItems="center" gap={2}>
              <Flex justifyContent="center">
                <Typography id="confirm-description">
                  Are you sure you want to delete this?
                </Typography>
              </Flex>
            </Flex>
          </DialogBody>
          <DialogFooter
            startAction={
              <Button onClick={() => setIsVisible(false)} variant="tertiary">
                Cancel
              </Button>
            }
            endAction={
              <Button
                variant="danger-light"
                onClick={() => handleUpdateRule()}
                startIcon={<Trash />}
              >
                Confirm
              </Button>
            }
          />
        </Dialog>
      </Box>
    </>
  );
};

export default DialogUpdate;
