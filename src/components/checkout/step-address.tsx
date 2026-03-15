import { Button } from "@/components/ui/button";

import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CheckoutSteps } from "@/types/checkout-steps";
import { Dispatch, SetStateAction } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useCheckoutStore } from "@/store/checkout-store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { estadosBR } from "@/data/estadosBR";

type Props = {
  setStep: Dispatch<SetStateAction<CheckoutSteps>>;
};

const formSchema = z.object({
  street: z.string().min(2, "Preencha seu endereço"),
  number: z.string().min(2, "Preencha seu número"),
  complement: z.string().optional(),
  district: z.string().min(2, "Preencha o bairro"),
  city: z.string().min(2, "Preencha a cidade"),
  state: z.string().min(2, "Preencha o estado"),
});

export const StepAddress = ({ setStep }: Props) => {
  const { address, setAddress } = useCheckoutStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...address },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setAddress(values);
    setStep("finish");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="grid grid-cols-2 gap-4">
        <Controller
          name="street"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Rua</FieldLabel>

              <Input {...field} />

              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          name="number"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Número</FieldLabel>

              <Input {...field} />

              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          name="complement"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Complemento</FieldLabel>

              <Input {...field} />

              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          name="district"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Bairro</FieldLabel>

              <Input {...field} />

              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          name="city"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Cidade</FieldLabel>

              <Input {...field} />

              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          name="state"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Estado</FieldLabel>

              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {estadosBR.map((uf) => (
                      <SelectItem key={uf} value={uf}>
                        {uf}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex justify-between mt-4">
        <Button variant="link" onClick={() => setStep("user")}>
          Voltar
        </Button>
        <Button type="submit">Concluir</Button>
      </div>
    </form>
  );
};
