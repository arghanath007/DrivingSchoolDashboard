import { useSnackbar } from "notistack";

const InnerNotificationConfig = (props) => {
  props.setUseNotificationRef(useSnackbar());
  return null;
};

let useNotificationRef;
const setUseNotificationRef = (useNotificationRefProp) => {
  useNotificationRef = useNotificationRefProp;
};

export const NotificationConfig = () => {
  return (
    <InnerNotificationConfig setUseNotificationRef={setUseNotificationRef} />
  );
};

export const Notification = {
  success(msg) {
    this.toast(msg, "success");
  },
  Warning(msg) {
    this.toast(msg, "Warning");
  },
  info(msg) {
    this.toast(msg, "info");
  },
  error(msg) {
    this.toast(msg, "error");
  },
  toast(msg, variant = "default") {
    useNotificationRef.enqueueSnackbar(msg, { variant });
  },
};
