import { updateField } from "@/features/field";
import { KEY_DEBOUNCE_DELAY } from "@/Constantes";
let debounceTimeout = null;

export const handleUpdateField = (fieldData, dispatch, spaceId, from) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(() => {
    console.log("running update " + from);
    dispatch(
      updateField({
        id: spaceId,
        fieldData: fieldData,
      })
    );
    debounceTimeout = null;
  }, KEY_DEBOUNCE_DELAY);
};
