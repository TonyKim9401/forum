export default function Time(req, res) {
  return res.status(200).json(new Date());
}
