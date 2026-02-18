import { toast as sonnerToast } from "sonner";

interface ToastProps {
  id: string | number;
  title: string;
  description: string;
  button?: {
    label: string;
    onClick: () => void;
  };
}

/** A fully custom toast that still maintains the animations and interactions. */
export function CustomToast(props: ToastProps) {
  const { title, description, button, id } = props;

  return (
    <div className="flex rounded-3xl bg-white ring-1 ring-black/5 shadow-xl shadow-black/5 w-full md:max-w-[356px] items-center px-5 py-4 gap-4 pointer-events-auto dark:bg-zinc-900 dark:ring-white/10 mx-auto">
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{title}</p>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      {button && (
        <button
          type="button"
          className="rounded-lg bg-primary-50 px-3.5 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50"
          onClick={() => {
            button.onClick();
            sonnerToast.dismiss(id);
          }}
        >
          {button.label}
        </button>
      )}
    </div>
  );
}

/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */
export function toast(props: Omit<ToastProps, "id">) {
  return sonnerToast.custom(id => (
    <CustomToast id={id} title={props.title} description={props.description} button={props.button} />
  ));
}
