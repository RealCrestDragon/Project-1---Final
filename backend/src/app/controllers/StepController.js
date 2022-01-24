const db = require('../models/firebaseAdmin');
const hash = require('../config/hash');
const FieldValue = require('firebase-admin').firestore.FieldValue;

class StepController {

    async findStep(req, res) {
        console.log(req.body.name)
        await db.collection('Steps').where('name', '>=', req.body.name).where('name', '<=', req.body.name+ '\uf8ff').get()
        .then (docs => {
            if(docs.empty) {
                console.log('1')
                return res.status(200).send('okay')
            }
            else {
                var steps = docs.docs;
                var items = steps.map((step) => {
                    return {
                        id: step.id,
                        name: step.data().name,
                        image: step.data().image,
                        other: step.data().other,
                        description: step.data().description,
                        nextSteps: step.data().nextSteps,
                        previousSteps: step.data().previousSteps,
                    }
                })
                return res.status(200).send(items);
            }
        })
        .catch (err => {
            console.log(err)
        })
    }
    
    // POST
    async createStep(req, res) {
        try {
            const step = req.body;
            console.log(step.previousSteps);
            const query = (await db.collection('Steps').get()).docs;
            const step_ = query.find(doc => {
                return doc.data().name === step.name;
            })
            if (!step_) {
                let id
                db.collection('Steps').add({
                        description: step.description,
                        image: step.image,
                        name: step.name,
                        other: step.other,
                        nextSteps: step.nextSteps,
                        previousSteps: step.previousSteps,
                    })
                .then(ref => {
                    id = ref.id;
                })
                for(const child of step.nextSteps) {
                    const data = (await db.collection('Steps').doc(child).get()).ref;
                    data.update({
                        previousSteps: FieldValue.arrayUnion(id)
                    })
                }
                for (const child of step.previousSteps) {
                    const data = (await db.collection('Steps').doc(child).get()).ref;
                    data.update({
                        nextSteps: FieldValue.arrayUnion(id)
                    })
                }
                return res.status(200).json({
                    id: 1,
                    message: 'Thêm thành công'});
            } else {
                return res.status(200).json({
                    id: 2,
                    message: 'Bước đã tồn tại!'}); 
            }               
        } catch (error) {
            console.log(error);
            console.log('Lỗi')
            return res.status(500).send(error);
        }
    }

    // GET
    async showDetail(req, res) {
        const stepId = req.params.id;
        
        const doc = await db.collection('Steps').doc(stepId).get()
            if(!doc.exists) {
                console.log('1')
                return res.status(200).send('khong ban')
            }
            else {
                const back = doc.data().nextSteps
                let arr = []
                for (const each of back) {
                    const data = await db.collection('Steps').doc(each).get()
                    console.log(data.data())
                    arr.push({
                        id: data.id,
                        name: data.data().name
                    })
                }
                const back2 = doc.data().previousSteps
                let arr2 = []
                for (const each of back2) {
                    const data = await db.collection('Steps').doc(each).get()
                    console.log(data.data())
                    arr2.push({
                        id: data.id,
                        name: data.data().name
                    })
                }
                const next = {
                    next: arr,
                }
                const prev = {
                    prev: arr2,
                }
                const finalRes = Object.assign(doc.data(), next, prev)
            console.log(finalRes)
            return res.status(200).send(finalRes)
            }
    }

    // DELETE
    async deleteStep(req, res) {
        try {
            const stepId = req.body.id;
            console.log(stepId);
            await db.collection('Steps').doc(stepId).delete()
            const docs = await db.collection('Steps').get();
            docs.forEach(doc => {
                doc.ref.update({
                    previousSteps: FieldValue.arrayRemove(stepId),
                    nextSteps: FieldValue.arrayRemove(stepId),
                })
            })
            return res.status(200).send("Xóa thành công");
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

module.exports = new StepController();
