const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const messages = err.issues[0].message;

    return res.status(400).json({ msg: messages });
  }
};

export default validate;
