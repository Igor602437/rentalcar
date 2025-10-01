import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import css from './RentForm.module.css';
import toast from 'react-hot-toast';

const today = new Date();
today.setHours(0, 0, 0, 0);

const validationSchema = Yup.object({
  name: Yup.string()
    .trim('No leading or trailing spaces allowed')
    .matches(
      /^[A-Za-zА-Яа-яЁё\s]+$/,
      'Name can only contain letters and spaces'
    )
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name must be at most 30 characters')
    .required('Name is required'),
  email: Yup.string()
    .trim()
    .email('Invalid email format')
    .required('Email is required'),
  date: Yup.date().min(today, 'Booking date cannot be in the past'),
  comment: Yup.string().max(200, 'Comment must be less than 200 characters'),
});

export default function RentForm() {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        date: '',
        comment: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        toast.success('Your car booking details have been sent.');
        console.log('Form submitted:', values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <h3 className={css.titleForm}>Book your car now</h3>
          <p className={css.description}>
            Stay connected! We are always ready to help you.
          </p>

          <div className={css.formInput}>
            <div className={css.fieldWrapper}>
              <Field
                name="name"
                placeholder="Name*"
                className={css.inputItem}
              />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>

            <div className={css.fieldWrapper}>
              <Field
                name="email"
                type="email"
                placeholder="Email*"
                className={css.inputItem}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.fieldWrapper}>
              <Field
                name="date"
                type="date"
                placeholder="Booking date"
                className={css.inputItem}
              />
              <ErrorMessage name="date" component="div" className={css.error} />
            </div>

            <div className={css.fieldWrapper}>
              <Field
                name="comment"
                as="textarea"
                placeholder="Comment"
                className={`${css.inputItem} ${css.inputTextarea}`}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={css.error}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={css.sendButton}
          >
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
}
