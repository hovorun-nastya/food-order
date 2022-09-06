import classes from './Checkout.module.css';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import React from "react";

const FormSchema = z.object({
    name: z.string().min(1),
    street: z.string().min(1),
    postalCode: z.number().min(5),
    city: z.string().min(1)
})

const Checkout = (props) => {

    const {
        register,
        watch,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(FormSchema)
    });

    const onSubmit = (data) => {
        props.onConfirm({
            name: data.name,
            street: data.street,
            postalCode: data.postalCode,
            city: data.city
        })
    };
    console.log(errors.name)


    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name'
                       {...register("name")}
                />
                {errors.name && <p className={classes.error}>{errors.name.message}</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street'{...register("street")} />
                {errors.street && <p className={classes.error}>{errors.street.message}</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='number' id='postal' {...register("postalCode", {
                    valueAsNumber: true,
                })}/>
                {errors.postalCode && <p className={classes.error}>{errors.postalCode.message}</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city'{...register("city")}/>
                {errors.city && <p className={classes.error}>{errors.city.message}</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button type='submit' className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;