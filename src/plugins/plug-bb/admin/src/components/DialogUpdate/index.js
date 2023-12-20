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
      <Dialog
        onClose={() => setIsVisible(false)}
        title="Confirmação"
        isOpen={isVisible}
      >
        <DialogBody icon={<ExclamationMarkCircle />}>
          <Flex direction="column" alignItems="center" gap={2}>
            <Flex justifyContent="center">
              <Typography id="confirm-description">
                Tem certeza que deseja atualizar essa regra?
              </Typography>
            </Flex>
          </Flex>
        </DialogBody>
        <DialogFooter
          startAction={
            <Button onClick={() => setIsVisible(false)} variant="tertiary">
              Cancelar
            </Button>
          }
          endAction={
            <Button
              variant="danger-light"
              startIcon={<Upload />}
              onClick={() => {
                handleUpdateRule(), setIsVisible((prev) => !prev);
              }}
            >
              Confirmar
            </Button>
          }
        />
      </Dialog>
    </>
  );
};

export default DialogUpdate;
