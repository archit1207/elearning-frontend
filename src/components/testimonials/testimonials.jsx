import './testimonials.css'

const testimonials = () => {
    const testimonialsData = [
        {
            id: 1,
            name: "Daniel Reed",
            position: "Student",
            message:
                "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
            image: "https://i.pravatar.cc/120?img=12"

        },
        {
            id: 2,
            name: "Olivia Brooks",
            position: "Student",
            message:
                "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
            image: "https://i.pravatar.cc/120?img=16"

        },
        {
            id: 3,
            name: "Michael Thompson",
            position: "Student",
            message:
                "Before joining this platform, I struggled to stay consistent. The structured modules and progress tracking keep me motivated every single day.",
            image: "https://i.pravatar.cc/120?img=8"
,
        },
        {
            id: 4,
            name: "Emily Carter",
            position: "Student",
            message:
                "I love how every course includes real-world projects. It doesn't feel like you're just memorizing — you're actually building things that matter.",
            image: "https://i.pravatar.cc/120?img=5"
,
        },
    ];
    return (
        <section className="testimonials">
            <h2>What our students say</h2>
            <div className="testimonials-cards">
                {
                    testimonialsData.map((e)=>(
                        <div className="testimonial-card" key={e.id}>
                            <div className="student-image">
                                <img src={e.image} alt="" />
                            </div>
                            <p className="message">{e.message}</p>
                            <div className="info">
                                <p className="name">{e.name}</p>
                                <p className="position">{e.position}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default testimonials
