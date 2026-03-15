import { Button } from "@/components/ui/button";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CheckoutSteps } from "@/types/checkout-steps";
import { Dispatch, SetStateAction } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useCheckoutStore } from "@/store/checkout-store";

type Props = {
  setStep: Dispatch<SetStateAction<CheckoutSteps>>;
};

const formSchema = z.object({
  name: z.string().min(2, "Preencha seu nome"),
});

export const StepUser = ({ setStep }: Props) => {
  const { name, setName } = useCheckoutStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setName(values.name);
    setStep("address");
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Seu nome</FieldLabel>

            <Input
              {...field}
              placeholder="Qual seu nome"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Button type="submit" variant="outline">
        Enviar
      </Button>
    </form>
  );
};
